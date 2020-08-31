 
type typeLineBotConfig = {
  channelAccessToken:string,
  channelSecret: string
}


//  linebotchannel
 export const lineBotConfig:typeLineBotConfig ={
   channelAccessToken: process.env.CHANNEL_TOKEN || "",
   channelSecret: process.env.CHANNEL_SECRET || ""
 }
