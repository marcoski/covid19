module.exports = {
  apps: [
    {
      name: 'covid19-server',
      script: 'index.js',
      cwd: './covid19-server',
      max_restarts: 4
    },
  ]
}