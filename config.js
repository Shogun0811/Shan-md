import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'

//Owner Numbers 
global.owner = [
  ['221760263631', 'Bicom', false],
  [''], 
  [''],
]

//global.pairingNumber = "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUVqKzY5RHVQZUgxc2NOcmpTRytIcnVobU5JTkh2UVBLbTY3QS9VNmQwTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiLzhCNXkvTFhkR2Njb3cxa2dNcHUvVUkydU03N3FwQldkK3dhV0NoZ2hHbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtUGFXWXZhT2hVdmpEdkMzTUJUREp5NzAyRmJKcVZYSVBaeUF5YThiLzI0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHeVl4cWdCU2RIOC9UT2N5bTNNRVA2NnhNT2RWMTI0UStrS0c4Wkt2TWdRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllNemdtZHg2V0V1OTIzOXhNeStDaEtjc0I4RDJxaXV3Y3JMd1pnQjdGbE09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InpNTnI5OHEvS1J1bEw2RUVvdk0vMFdiV2poVjM3VVJsNWVKS005azlNaUk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic1BiQUpiOUZ4RVhRS2t6d2NOSld3bjNLQ0VJN0tWN1JtVG1aQkJ4Y0cxST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQU9Uais4ZXdLOUswRVZFZGl2RXNUR2pGaEJXU2g3WUllM2I4ZUxnTm5CMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlYybDJhZXpUMnpUUUQxN0FVUWZJU1hackw4RllsVDlYVEtla0dMOTNYb3Vtd3ZyYWF6dERyVjVHVWxZK1A3NFY2RWJ1bGwvSXZUQVFWYUUwb3FwZGpnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTY1LCJhZHZTZWNyZXRLZXkiOiJKTjRKak1ZU01lbkxEbHBTckdVNE41MS9qaVkzT2hlcTRXV2piSDloaDQwPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIyMTc2MDI2MzYzMUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJBRjE1MDgwOTBBOEREOTU0REMwRkU1MDM2NUZGODBGMCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzE5Nzc4MDU1fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyMjE3NjAyNjM2MzFAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMEU0REYyMTI5REExQ0NFNzBERkJDM0RDNTc1Q0JCOUEifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcxOTc3ODA2MH1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiQ2h2TGFRaVRSR3FJeF84aWYwczk5dyIsInBob25lSWQiOiJmMGM0ZmU0Zi1lZGEyLTQ4YzUtYTM0Mi1mYmQ5ZjI4ZGQ2YzYiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaWF5dk5sV3UvTm04MjUvcXJOVkxieHdYOWNnPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNrZGpaaW04WmFFUXdxOWN4YkRpWU5nVEJoMD0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJIOUxCWVBENiIsIm1lIjp7ImlkIjoiMjIxNzYwMjYzNjMxOjRAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi44Kk44OQ44Op44OS44OeLvCdkIHwnZCi8J2QnPCdkKjwnZCm8J2QmvCdkKvwnZCuIPCdkJLwnZCh8J2QqPCdkKDwnZCu8J2Qp/CdkJrEqyJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTGlFdjlzSEVJRDJoclFHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiZ2ZkVDBRbndaMU04aThWU3J5UHNZeEI0TFlYK1dONlBiYWhQdFNsSjZFVT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiOGRtZnIvK0Y2SWE3enJFcDRIaDQ4NzBWc3NYK3pQaEV1czh6YmY3bUhlbjRlOVIzV3JYTmtPWGxjQ1hQS1A0YWdhRVNicXBXak13bGpEaytaVE5nREE9PSIsImRldmljZVNpZ25hdHVyZSI6IlY1eHdNK3Qvc3NMZUp4MzEyVGd3NEZBa3RRV2N1YWRqWXI3NzRWajZGNkJvaEsvNG5URXNMUEVpQkZBcFB6UEttYXFpV3ljN25tbTQzdlIwbndkWWhRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjIxNzYwMjYzNjMxOjRAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWUgzVTlFSjhHZFRQSXZGVXE4ajdHTVFlQzJGL2xqZWoyMm9UN1VwU2VoRiJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcxOTc3ODA1MSwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFNMG0ifQ==" //put your bot number here
global.mods = ['221760263631'] 
global.prems = ['221760263631', '221760263631', '221760263631']
global.allowed = ['923046950301']
global.keysZens = ['c2459db922', '37CC845916', '6fb0eff124']
global.keysxxx = keysZens[Math.floor(keysZens.length * Math.random())]
global.keysxteammm = ['29d4b59a4aa687ca', '5LTV57azwaid7dXfz5fzJu', 'cb15ed422c71a2fb', '5bd33b276d41d6b4', 'HIRO', 'kurrxd09', 'ebb6251cc00f9c63']
global.keysxteam = keysxteammm[Math.floor(keysxteammm.length * Math.random())]
global.keysneoxrrr = ['5VC9rvNx', 'cfALv5']
global.keysneoxr = keysneoxrrr[Math.floor(keysneoxrrr.length * Math.random())]
global.lolkeysapi = ['GataDios']

global.APIs = { // API Prefix
  // name: 'https://website'
  xteam: 'https://api.xteam.xyz', 
  nrtm: 'https://fg-nrtm.ddns.net',
  bg: 'http://bochil.ddns.net',
  fgmods: 'https://api.fgmods.xyz'
}
global.APIKeys = { // APIKey Here
  // 'https://website': 'apikey'
  'https://api.xteam.xyz': 'd90a9e986e18778b',
  'https://zenzapis.xyz': '675e34de8a', 
  'https://api.fgmods.xyz': 'dEBWvxCY'
}

// Sticker WM
global.botname = 'ꌚⱧ₳₦-BOT-MÐ'
global.princebot = '🛡️ՏᎻᎪΝ ᗷOT ᗰᗪ🛡️'
global.packname = 'Bicom♥️' 
global.author = 'BLab♥️' 
global.princeig = 'https://www.instagram.com' 
global.princegp = 'https://chat.whatsapp.com/CvRhsxGwy1IHceYhCbEjry'
global.menuvid = 'https://i.imgur.com/GFAAXqw.mp4'
global.Princesc = 'https://github.com/Shan974' 
global.princeyt = 'https://youtube.com/'
global.Princelog = 'https://telegra.ph/file/11643326c548e79c8899b.jpg'
global.thumb = fs.readFileSync('./Assets/Prince.png')

global.wait = '*♻️ _𝙶𝙴𝚃𝚃𝙸𝙽𝙶 𝚈𝙾𝚄𝚁 𝙵𝙸𝙻𝙴 𝚆𝙰𝙸𝚃..._*\n*▰▰SHAN MD LODING▰▱▱▱▱▱*'
global.imgs = '*🖼️ _𝙶𝙴𝚃𝚃𝙸𝙽𝙶 𝚈𝙾𝚄𝚁 ɪᴍᴀɢᴇs 𝚆𝙰𝙸𝚃..._*\n*▰▰▰▱▱▱▱▱*'
global.rwait = '♻️'
global.dmoji = '🤭'
global.done = '✅'
global.error = '❌' 
global.xmoji = '🌀' 

global.multiplier = 69 
global.maxwarn = '2' // máxima advertencias

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
