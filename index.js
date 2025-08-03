// --- Servidor Web para manter Replit acordado ---
const express = require('express')
const app = express()
app.get('/', (req, res) => res.send('Bot do Minecraft está online!'))
app.listen(3000, () => console.log('Servidor web ativo na porta 3000'))

// --- Bot Mineflayer com reconexão automática ---
const mineflayer = require('mineflayer')

function criarBot() {
  const bot = mineflayer.createBot({
    host: 'eldoriasserver.falixsrv.me', // IP do servidor FalixNodes
    port: 27167,                // Porta do servidor (se diferente, altere)
    username: 'BOTZ1'          // Nome do bot no servidor
  })

  bot.on('login', () => {
    console.log('✅ Bot entrou no servidor!')
  })

  bot.on('spawn', () => {
    console.log('🎮 Bot spawnado e pronto!')
  })

  bot.on('end', () => {
    console.log('⚠️ Bot desconectou! Tentando reconectar em 10s...')
    setTimeout(criarBot, 10000) // Reconecta em 10 segundos
  })

  bot.on('error', (err) => {
    console.log('❌ Erro detectado: ' + err.message)
  })
}

criarBot()