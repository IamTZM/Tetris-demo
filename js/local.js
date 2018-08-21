let Local = function () {
  // 游戏对象
  let game
  // 时间间隔
  const INTERVAL = 200
  // 时间计数器
  let timeCount = 0
  // 时间
  let time = 0
  // 定时器
  let timer = null

  // 键盘事件绑定
  let bindKeyEvent = function () {
    document.onkeydown = function (e) {
      if (e.keyCode == 38) { // up
        game.rotate()
      } else if (e.keyCode == 39) { // right
        game.right()
      } else if (e.keyCode == 40) { // down
        game.down()
      } else if (e.keyCode == 37) { // left
        game.left()
      } else if (e.keyCode == 32) { // space
        game.fall()
      }
    }
  }

  // 移动
  let move = function () {
    timeFunc()
    if (!game.down()) {
      game.fixed()
      let line = game.checkClear()
      if (line) {
        game.addScore(line)
      }
      let gameOver = game.checkGameOver()
      if (gameOver) {
        game.gameover(false)
        stop()
      } else {
        game.performNext(generateType(), generateDir())
      }
    }
  }

  // 计时函数
  let timeFunc = function () {
    timeCount++
    if (timeCount == 5) {
      timeCount = 0
      time++
      game.setTime(time)
    }
  }

  // 随机生成一个方块种类
  let generateType = function () {
    return Math.ceil(Math.random() * 7) - 1
  }

  // 随机生成一个旋转方向
  let generateDir = function () {
    return Math.ceil(Math.random() * 4) - 1
  }

  // 开始方法
  let startGame = function () {
    let doms = {
      gameDiv: document.getElementById('game'),
      nextDiv: document.getElementById('next'),
      timeDiv: document.getElementById('time'),
      scoreDiv: document.getElementById('score'),
      resultDiv: document.getElementById('gameover')
    }
    game = new Game()
    game.init(doms, generateType(), generateDir())
    bindKeyEvent()
    game.performNext(generateType(), generateDir())
    timer = setInterval(move, INTERVAL)
  }

  // 结束
  let stop = function () {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
    document.onkeydown = null
  }
  // 导出 API
  this.startGame = startGame
}