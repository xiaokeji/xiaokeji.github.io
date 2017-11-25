
require = function e(t, i, n) {

    function c(o, a) {
        if (!i[o]) {
            if (!t[o]) {
                var r = "function" == typeof require && require;
                if (!a && r) return r(o, !0);
                if (s) return s(o, !0);
                var u = new Error("Cannot find module '" + o + "'");
                throw u.code = "MODULE_NOT_FOUND", u
            }
            var h = i[o] = {
                exports: {}
            };
            t[o][0].call(h.exports, function (e) {
                var i = t[o][1][e];
                return c(i || e)
            }, h, h.exports, e, t, i, n)
        }
        return i[o].exports
    }
    for (var s = "function" == typeof require && require, o = 0; o < n.length; o++) c(n[o]);
    return c
}({
    Bird: [
        function (e, t, i) {
            "use strict";
            cc._RF.push(t, "3ff9b3FqCVN24J+HOuQGI3q", "Bird");
            var n = cc.Enum({
                Ready: -1,
                Rise: -1,
                FreeFall: -1,
                Drop: -1,
                Dead: -1
            });
            cc.Class({
                statics: {
                    State: n
                },
                extends: cc.Component,
                properties: {
                    initRiseSpeed: 800,
                    gravity: 1e3,
                    state: {
                        default: n.Ready,
                        type: n
                    },
                    ground: {
                        default: null,
                        type: cc.Node
                    },
                    riseAudio: {
                        default: null,
                        url: cc.AudioClip
                    },
                    dropAudio: {
                        default: null,
                        url: cc.AudioClip
                    },
                    hitAudio: {
                        default: null,
                        url: cc.AudioClip
                    }
                },
                init: function (e) {
                    this.game = e, this.state = n.Ready, this.currentSpeed = 0, this.anim = this.getComponent(cc.Animation), this.anim.playAdditive("birdFlapping"), this.anim.playAdditive("birdWing")
                }, startFly: function () {
                    this._getNextPipe(), this.anim.stop("birdFlapping"), this.rise()
                }, _getNextPipe: function () {
                    this.nextPipe = this.game.pipeManager.getNext()
                }, update: function (e) {
                    this.state !== n.Ready && this.state !== n.Dead && (this._updatePosition(e), this._updateState(e), this._detectCollision(), this._fixBirdFinalPosition())
                }, _updatePosition: function (e) {
                    (this.state === n.Rise || this.state === n.FreeFall || this.state === n.Drop) && (this.currentSpeed -= e * this.gravity, this.node.y += e * this.currentSpeed)
                }, _updateState: function (e) {
                    switch (this.state) {
                    case n.Rise:
                        this.currentSpeed < 0 && (this.state = n.FreeFall, this._runFallAction());
                        break;
                    case n.Drop:
                        this._detectCollisionWithBird(this.ground) && (this.state = n.Dead)
                    }
                }, _detectCollision: function () {
                    var e = this;
                    if (this.nextPipe && this.state !== n.Ready && this.state !== n.Dead && this.state !== n.Drop) {
                        var t = !1;
                        this._detectCollisionWithBird(this.nextPipe.topPipe) && (t = !0), this._detectCollisionWithBird(this.nextPipe.bottomPipe) && (t = !0);
                        var i = !1;
                        this._detectCollisionWithBird(this.ground) && (i = !0), t || i ? (cc.audioEngine.playEffect(this.hitAudio), i ? this.state = n.Dead : (this.state = n.Drop, this._runDropAction(), this.scheduleOnce(function () {
                            cc.audioEngine.playEffect(e.dropAudio)
                        }, .3)), this.anim.stop(), this.game.gameOver()) : this.node.x > this.nextPipe.node.x + this.nextPipe.topPipe.width && (this.game.gainScore(), this._getNextPipe())
                    }
                }, _fixBirdFinalPosition: function () {
                    this._detectCollisionWithBird(this.ground) && (this.node.y = this.ground.y + this.node.width / 2)
                }, _detectCollisionWithBird: function (e) {
                    return cc.rectIntersectsRect(this.node.getBoundingBoxToWorld(), e.getBoundingBoxToWorld())
                }, rise: function () {
                    this.state = n.Rise, this.currentSpeed = this.initRiseSpeed, this._runRiseAction(), cc.audioEngine.playEffect(this.riseAudio)
                }, _runRiseAction: function () {
                    this.node.stopAllActions();
                    var e = cc.rotateTo(.3, -30).easing(cc.easeCubicActionOut());
                    this.node.runAction(e)
                }, _runFallAction: function () {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : .6;
                    this.node.stopAllActions();
                    var t = cc.rotateTo(e, 90).easing(cc.easeCubicActionIn());
                    this.node.runAction(t)
                }, _runDropAction: function () {
                    this.currentSpeed > 0 && (this.currentSpeed = 0), this._runFallAction(.4)
                }
            }), cc._RF.pop()
        }, {}
    ],
    ButtonStartGame2: [
        function (e, t, i) {
            "use strict";
            cc._RF.push(t, "d4df2fO4wpAK5DUHoJyxabB", "ButtonStartGame2");
            var n = e("com");
            cc.Class({
                extends: cc.Component,
                properties: {
                    swooshingAudio: {
                        default: null,
                        url: cc.AudioClip
                    },
                    maskLayer: {
                        default: null,
                        type: cc.Node
                    },
                    boxnum: {
                        default: null,
                        type: cc.Node
                    },
                    boxname: {
                        default: null,
                        type: cc.Node
                    },
                    txt: {
                        default: null,
                        type: cc.Node
                    },
                    tiao: {
                        default: null,
                        type: cc.Node
                    }
                },
                startGame: function () {
                    cc.audioEngine.playEffect(this.swooshingAudio), this.maskLayer.active = !0, this.maskLayer.opacity = 0, this.maskLayer.color = cc.Color.BLACK, n.name = this.boxname.getComponent(cc.EditBox).string, n.number = this.boxnum.getComponent(cc.EditBox).string, n.hard = this.tiao.getComponent(cc.Slider).progress > .66 ? 1 : this.tiao.getComponent(cc.Slider).progress > .33 ? 2 : 3, "" != n.name && "" != n.number ? this.maskLayer.runAction(cc.sequence(cc.fadeIn(.2), cc.callFunc(function () {
                        cc.director.loadScene("game")
                    }, this))) : ("" == n.name && (this.boxname.getComponent(cc.EditBox).string = "你没看见我么？"), "" == n.number && (this.boxnum.getCOmponent(cc.EditBox).string = "你没看见我么？"))
                }, changeHard: function () {
                    n.hard = this.tiao.getComponent(cc.Slider).progress > .66 ? 1 : this.tiao.getComponent(cc.Slider).progress > .33 ? 2 : 3, this.txt.getComponent(cc.Label).string = "当前难度：" + n.hard
                }
            }), cc._RF.pop()
        }, {
            com: "com"
        }
    ],
    ButtonStartGame: [
        function (e, t, i) {
            "use strict";
            cc._RF.push(t, "7d1e4bMKtJM+rfUOnDPuL5e", "ButtonStartGame");
            
            var mo = e("com");
            cc.Class({
                extends: cc.Component,
                properties: {
                    swooshingAudio: {
                        default: null,
                        url: cc.AudioClip
                    },
                    maskLayer: {
                        default: null,
                        type: cc.Node
                    },
                    web: {
                        default: null,
                        type: cc.WebView
                    }
                },
                startGame: function () {
                    cc.audioEngine.playEffect(this.swooshingAudio), this.maskLayer.active = !0, this.maskLayer.opacity = 0, this.maskLayer.color = cc.Color.BLACK, this.maskLayer.runAction(cc.sequence(cc.fadeIn(.2), cc.callFunc(function () {
                        cc.director.loadScene("game")
                    }, this)))
                }
            }), cc._RF.pop()
        }, {
            com: "com"
        }
    ],
    ButtonrangGame: [
        function (e, t, i) {
            
            "use strict";
            cc._RF.push(t, "63a07373g9N2YtkZyDGqzp8", "ButtonrangGame"), cc.Class({
                extends: cc.Component,
                properties: {
                    swooshingAudio: {
                        default: null,
                        url: cc.AudioClip
                    },
                    maskLayer: {
                        default: null,
                        type: cc.Node
                    }
                },
                startGame: function () {
                    cc.audioEngine.playEffect(this.swooshingAudio), this.maskLayer.active = !0, this.maskLayer.opacity = 0, this.maskLayer.color = cc.Color.BLACK, this.maskLayer.runAction(cc.sequence(cc.fadeIn(.2), cc.callFunc(function () {
                        cc.director.loadScene("scene")
                    }, this)))
                }
            }), cc._RF.pop()
        }, {}
    ],
    Game: [
        function (e, t, i) {
            "use strict";
            cc._RF.push(t, "6d5a4SXkHRP15ICrxcjO41C", "Game");
            var n = e("PipeManager"),
                c = e("Bird"),
                s = e("Scroller"),
                o = e("com");
            cc.Class({
                extends: cc.Component,
                properties: {
                    score1: 10,
                    score2: 20,
                    score3: 30,
                    score4: 40,
                    score5: 50,
                    score6: 60,
                    goldScore: 30,
                    silverScore: 10,
                    pipeManager: n,
                    bird: c,
                    scoreLabel: cc.Label,
                    maskLayer: {
                        default: null,
                        type: cc.Node
                    },
                    ground: {
                        default: null,
                        type: cc.Node
                    },
                    readyMenu: {
                        default: null,
                        type: cc.Node
                    },
                    gameOverMenu: {
                        default: null,
                        type: cc.Node
                    },
                    scoreAudio: {
                        default: null,
                        url: cc.AudioClip
                    },
                    swooshingAudio: {
                        default: null,
                        url: cc.AudioClip
                    }
                },
                onLoad: function () {
                    
                    this.score = 0, this.scoreLabel.string = this.score, this.bird.init(this), this._enableInput(!0), this._registerInput(), this._revealScene()
                }, _revealScene: function () {
                    this.maskLayer.active = !0, this.maskLayer.color = cc.Color.BLACK, this.maskLayer.runAction(cc.fadeOut(.3))
                }, restart: function () {
                    cc.audioEngine.playEffect(this.swooshingAudio), this.maskLayer.color = cc.Color.BLACK, this.maskLayer.runAction(cc.sequence(cc.fadeIn(.3), cc.callFunc(function () {
                        cc.director.loadScene("game")
                    }, this)))
                }, _gameStart: function () {
                    o.rand = Date.parse(new Date())
                    document.getElementsByTagName('title')[0].setAttribute("rand",o.rand)
                     this._hideReadyMenu(), 
                     this.pipeManager.startSpawn(), 
                     this.bird.startFly()
                }, gameOver: function () {
                    var dataBase = AV.Object.extend('dataBase');
                    // 新建对象
                    var dataBaser = new dataBase();
                    // 设置名称
                    dataBaser.set('name',o.name);
                    // 设置优先级
                    dataBaser.set('number',o.number);
                    dataBaser.set('hard',o.hard);
                    dataBaser.set('begintime',o.rand);
                    dataBaser.set('score',this.score);
                    dataBaser.set('gametime',Date.parse(new Date())-o.rand);
                    dataBaser.save().then(function (todo) {
                      console.log('objectId is ' + todo.id);
                    }, function (error) {
                      console.error(error);
                    });
                    this.pipeManager.reset(),
                    this.ground.getComponent(s).stopScroll(), this._enableInput(!1), this._blinkOnce(), this._showGameOverMenu()
                }, gainScore: function () {
                    this.score++, this.scoreLabel.string = this.score, cc.audioEngine.playEffect(this.scoreAudio)
                }, _hideReadyMenu: function () {
                    var e = this;
                    this.scoreLabel.node.runAction(cc.fadeIn(.3)), this.readyMenu.runAction(cc.sequence(cc.fadeOut(.5), cc.callFunc(function () {
                        e.readyMenu.active = !1
                    }, this)))
                }, _blinkOnce: function () {
                    this.maskLayer.color = cc.Color.WHITE, this.maskLayer.runAction(cc.sequence(cc.fadeTo(.1, 200), cc.fadeOut(.1)))
                }, _showGameOverMenu: function () {
                    var e = this;
                    this.scoreLabel.node.runAction(cc.sequence(cc.fadeOut(.3), cc.callFunc(function () {
                        e.scoreLabel.active = !1
                    }, this)));
                    var t = this.gameOverMenu.getChildByName("gameOverLabel"),
                        i = this.gameOverMenu.getChildByName("resultBoard"),
                        n = this.gameOverMenu.getChildByName("startButton"),
                        c = this.gameOverMenu.getChildByName("rangButton"),
                        s = i.getChildByName("currentScore"),
                        a = i.getChildByName("bestScore"),
                        r = i.getChildByName("hard"),
                        u = i.getChildByName("medal"),
                        h = "bestScore" + o.hard,
                        d = cc.sys.localStorage.getItem(h);
                    ("null" === d || this.score > d) && (d = this.score), cc.sys.localStorage.setItem(h, d), this.anim = u.getComponent(cc.Animation), this.anim.play(), this.anim.setCurrentTime(4), r.getComponent(cc.Label).string = o.hard, s.getComponent(cc.Label).string = this.score, a.getComponent(cc.Label).string = d, this.score >= this.score6 ? (this.anim.play(), this.anim.setCurrentTime(4), this.anim.stop("modles")) : this.score >= this.score5 ? (this.anim.play(), this.anim.setCurrentTime(5), this.anim.stop("modles")) : this.score >= this.score4 ? (this.anim.play(), this.anim.setCurrentTime(3), this.anim.stop("modles")) : this.score >= this.score3 ? (this.anim.play(), this.anim.setCurrentTime(2), this.anim.stop("modles")) : this.score >= this.score2 ? (this.anim.play(), this.anim.setCurrentTime(6), this.anim.stop("modles")) : this.score >= this.score1 ? (this.anim.play(), this.anim.setCurrentTime(1), this.anim.stop("modles")) : (this.anim.play(), this.anim.setCurrentTime(0), this.anim.stop("modles"));
                    var p = function (t, i, s) {
                        n.active = !0, c.active = !0, cc.audioEngine.playEffect(e.swooshingAudio), t.runAction(cc.sequence(i, cc.callFunc(function () {
                            s && s()
                        }, e)))
                    };
                    this.gameOverMenu.active = !0;
                    this.scheduleOnce(function () {
                        return p(t, cc.spawn(cc.fadeIn(.2), cc.sequence(cc.moveBy(.2, cc.p(0, 10)), cc.moveBy(.5, cc.p(0, -10)))), function () {
                            return p(i, cc.moveTo(.5, cc.p(i.x, -250)).easing(cc.easeCubicActionOut()), function () {
                                return p(n, cc.fadeIn(.5), function () {
                                    return p(c, cc.fadeIn(.5))
                                })
                            })
                        })
                    }, .55)
                }, _startGameOrJumpBird: function () {
                    this.bird.state === c.State.Ready ? this._gameStart() : this.bird.rise()
                }, _registerInput: function () {
                    cc.eventManager.addListener({
                        event: cc.EventListener.KEYBOARD,
                        onKeyPressed: function (e, t) {
                            this._startGameOrJumpBird()
                        }.bind(this)
                    }, this.node), cc.eventManager.addListener({
                        event: cc.EventListener.TOUCH_ONE_BY_ONE,
                        onTouchBegan: function (e, t) {
                            return this._startGameOrJumpBird(), !0
                        }.bind(this)
                    }, this.node)
                }, _enableInput: function (e) {
                    e ? cc.eventManager.resumeTarget(this.node) : cc.eventManager.pauseTarget(this.node)
                }
            }), cc._RF.pop()
        }, {
            Bird: "Bird",
            PipeManager: "PipeManager",
            Scroller: "Scroller",
            com: "com"
        }
    ],
    PipeGroup: [
        function (e, t, i) {
            "use strict";
            cc._RF.push(t, "86f21otUfpLj4fEQlUT5NXV", "PipeGroup");
            var n = e("com");
            cc.Class({
                extends: cc.Component,
                properties: {
                    topPipeMinHeight: 100,
                    bottomPipeMinHeight: 100,
                    spacingMinValue: 1 == n.hard ? 450 : 2 == n.hard ? 350 : 300,
                    spacingMaxValue: 1 == n.hard ? 500 : 2 == n.hard ? 400 : 350,
                    topPipe: cc.Node,
                    bottomPipe: cc.Node
                },
                init: function (e) {
                    this.pipeManager = e, this._initPositionX(), this._initPositionY()
                }, _initPositionX: function () {
                    var e = cc.director.getVisibleSize(),
                        t = -e.width / 2,
                        i = e.width / 2;
                    this.node.x = i + 300, this.recylceX = t - Math.max(this.topPipe.width, this.bottomPipe.width)
                }, _initPositionY: function () {
                    var e = cc.director.getVisibleSize().height / 2 - this.topPipeMinHeight,
                        t = cc.find("Canvas/ground").y + this.bottomPipeMinHeight,
                        i = (1 == n.hard ? 400 : 2 == n.hard ? 300 : 250) + Math.random() * ((1 == n.hard ? 450 : 2 == n.hard ? 350 : 300) - (1 == n.hard ? 400 : 2 == n.hard ? 300 : 250));
                    this.topPipe.y = e - Math.random() * (e - t - i), this.bottomPipe.y = this.topPipe.y - i
                }, update: function (e) {
                    this.pipeManager.isRunning && (this.node.x += this.pipeManager.pipeMoveSpeed * e, this.node.x < this.recylceX && this.pipeManager.recyclePipe(this))
                }
            }), cc._RF.pop()
        }, {
            com: "com"
        }
    ],
    PipeManager: [
        function (e, t, i) {
            "use strict";
            cc._RF.push(t, "698a5FNiQFCTZIR0alYwSQo", "PipeManager");
            var n = e("PipeGroup");
            cc.Class({
                extends: cc.Component,
                properties: {
                    pipePrefab: cc.Prefab,
                    pipeMoveSpeed: -300,
                    pipeSpacing: 500
                },
                onLoad: function () {
                    this.pipeList = [], this.isRunning = !1
                }, startSpawn: function () {
                    this._spawnPipe();
                    var e = Math.abs(this.pipeSpacing / this.pipeMoveSpeed);
                    this.schedule(this._spawnPipe, e), this.isRunning = !0
                }, _spawnPipe: function () {
                    var e = null;
                    e = cc.pool.hasObject(n) ? cc.pool.getFromPool(n) : cc.instantiate(this.pipePrefab).getComponent(n), this.node.addChild(e.node), e.node.active = !0, e.init(this), this.pipeList.push(e)
                }, recyclePipe: function (e) {
                    e.node.removeFromParent(), e.node.active = !1, cc.pool.putInPool(e)
                }, getNext: function () {
                    return this.pipeList.shift()
                }, reset: function () {
                    this.unschedule(this._spawnPipe), this.pipeList = [], this.isRunning = !1
                }
            }), cc._RF.pop()
        }, {
            PipeGroup: "PipeGroup"
        }
    ],
    Scroller: [
        function (e, t, i) {
            "use strict";
            cc._RF.push(t, "522b3wvQk1GaKLgYsEf1ymf", "Scroller"), cc.Class({
                extends: cc.Component,
                properties: {
                    speed: -300,
                    resetX: -300
                },
                onLoad: function () {
                    this.canScroll = !0
                }, update: function (e) {
                    this.canScroll && (this.node.x += this.speed * e, this.node.x <= this.resetX && (this.node.x -= this.resetX))
                }, stopScroll: function () {
                    this.canScroll = !1
                }, startScroll: function () {
                    this.canScroll = !0
                }
            }), cc._RF.pop()
        }, {}
    ],
    com: [
        function (e, t, i) {
            "use strict";
            cc._RF.push(t, "1d034ss1TJP9ZVcWDlmal9p", "com"), t.exports = {
                name: null,
                number: null,
                hard: null,
                rand: null,
                score: null,
                
            }, cc._RF.pop()
        }, {}
    ]
}, {}, ["Bird", "ButtonStartGame", "ButtonStartGame2", "ButtonrangGame", "Game", "PipeGroup", "PipeManager", "Scroller", "com"]);