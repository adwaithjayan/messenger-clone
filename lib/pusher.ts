import PusherServer from 'pusher';
import PusherClient from 'pusher-js';


export const pusherServer =new PusherServer({
      appId: process.env.PUBLISHER_APP_ID!,
      key: process.env.NEXT_PUBLIC_PUBLISHER_APP_KEY!,
      secret: process.env.PUBLISHER_SECRET!,
      cluster: "ap2",
      useTLS: true
})

export const pusherClient =new PusherClient(
    process.env.NEXT_PUBLIC_PUBLISHER_APP_KEY!,
    {
          channelAuthorization:{
                endpoint:'/api/pusher/auth',
                transport:'ajax',
          },
          cluster:'ap2',
    }
);