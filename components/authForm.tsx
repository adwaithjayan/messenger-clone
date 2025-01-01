"use client"

import React, {useCallback, useEffect, useState} from 'react'
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {BsGithub} from "react-icons/bs";
import {FcGoogle} from "react-icons/fc";
import axios from "axios";

import Input from "@/components/input";
import Button from "@/components/button";
import AuthSocialButton from "@/components/authSocial";
import toast from "react-hot-toast";
import {signIn, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

type Varient = "LOGIN"|"REGISTER";

const AuthForm = () => {
      const session = useSession();
      const [variant,setVariant] = useState<Varient>('LOGIN');
      const [loading, setLoading] = useState(false);
      const router = useRouter();

      const toggleVariant = useCallback( () => {
            if(variant === "LOGIN") {
                  setVariant("REGISTER");
            }else {
                  setVariant("LOGIN");
            }
      },[variant]);

      useEffect(() => {
            if(session?.status==='authenticated'){
                  router.push('/users');
            }
      },[session?.status])

      const { register, handleSubmit, formState:{errors} } = useForm<FieldValues>({
            defaultValues:{
                  name:'',
                  email:'',
                  password:'',
            }
      });

      const onSubmit:SubmitHandler<FieldValues> =(data)=>{
            setLoading(true);
            if(variant === "LOGIN") {
                  // login
                  signIn("credentials", {
                        ...data,
                        redirect: false,
                  })
                      .then((callback) => {
                            if (callback?.error) {
                                  toast.error("Invalid credentials");
                            }
                            if (callback?.ok && !callback?.error) {
                                  toast.success("Logged in successfully");
                            }
                      })
                      .finally(() => {
                            setLoading(false);
                      });
            }
            if(variant === "REGISTER") {
                  //register
                  axios.post('/api/register', data).then(() => {
                        toast.success('Account created successfully.');
                        signIn("credentials", data)
                  }).catch(error => {
                        toast.error(error.response.data || 'Something went wrong.');
                  }).finally(
                      () => setLoading(false),
                  )

            }
      };

      const socialSignIn =(action:string)=>{
            setLoading(true);
            signIn(action, { redirect: false })
                .then((callback) => {
                      if (callback?.error) {
                            toast.error("Something went wrong with your social login");
                      }
                      if (callback?.ok && !callback?.error) {
                            toast.success("Logged in successfully");
                      }
                })
                .finally(() => {
                      setLoading(false);
                });
      }

      return (
          <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
                <div className='bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10'>
                      <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
                            {
                                  variant === 'REGISTER' &&
                                    <Input id='name' type='name' errors={errors} register={register} label='Name' disabled={loading} />

                            }
                            <Input id='email' type='email' errors={errors} register={register} label='Email' disabled={loading} />
                            <Input id='password' type='password' errors={errors} register={register} label='Password' disabled={loading} />
                            <div className=''>
                                  <Button fullWidth disabled={loading} type="submit">
                                        {variant === 'LOGIN' ? 'Sign In' : 'Register'}
                                  </Button>
                            </div>
                      </form>
                      <div className='mt-6'>
                            <div className='relative'>
                                  <div className='absolute inset-8 flex items-center'>
                                        <div className="w-full border-t border-gray-300"></div>
                                  </div>
                                  <div className="relative flex justify-center text-sm mt-5">
                                      <span className="bg-white px-2 text-gray-500">
                                        Or continue with
                                      </span>
                                  </div>
                            </div>
                            <div className='mt-6 flex gap-2 justify-center'>
                                  <AuthSocialButton icon={FcGoogle} onClick={()=>socialSignIn('google')}/>
                                  <AuthSocialButton icon={BsGithub} onClick={()=>socialSignIn('github')}/>
                            </div>
                      </div>
                </div>

                <div className='flex gap-2 justify-center text-sm mt-6 text-gray-500'>
                      <div>
                            {variant === "LOGIN"
                                ? "New to Neural Feed Messenger?"
                                : "Already have an account?"}
                      </div>
                      <div
                          onClick={toggleVariant}
                          className="underline text-indigo-500 hover:text-indigo-600 cursor-pointer"
                      >
                            {variant === "LOGIN" ? "Create An Account" : "Login"}
                      </div>
                </div>

          </div>
      )
}
export default AuthForm
