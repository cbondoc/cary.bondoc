// main.ts -> main.js
var djankey;
(function(djankey) {
    var BreakImage = (function() {
        function BreakImage(canvasID) {
            var _this = this;
            this.rows = 25;
            this.columns = 25;
            this.mouse_down = false;
            this.particles = new Array();
            // init
            this.init = function() {
                // stage
                _this.stage = new createjs.Stage(_this.canvas);

                //this.stage.enableDOMEvents(false);
                this.stage.mouseMoveOutside = true;
                createjs.Touch.enable(_this.stage);
                createjs.Ticker.setFPS(60);

                _this.stageWidth = _this.canvas.width;
                _this.stageHeight = _this.canvas.height;

                // text
                _this.label = new createjs.Text("waiting image...", '11px Verdana', '#1385ff');
                _this.label.x = 10;
                _this.label.y = _this.stageHeight - 20;
                _this.stage.addChild(_this.label);

                // stats
                _this.stats = new Stats();
                _this.stats.setMode(0);
                //document.body.appendChild(_this.stats.domElement);

                // load image
                _this.imgQueue = new createjs.LoadQueue(false);
                _this.imgQueue.on("fileload", _this.imageLoaded);
                _this.imgQueue.on("error", _this.imageError);

                // let's go
                createjs.Ticker.addEventListener("tick", _this.update);
            };
            this.imageError = function(event) {
                _this.label.text = "Loading error!";
            };
            this.imageLoaded = function(event) {
                // hide loading...
                _this.label.text = "";

                _this.img = event.result;
                _this.offset_x = (_this.stageWidth - _this.img.width) / 2;
                _this.offset_y = (_this.stageHeight - _this.img.height) / 2;
                _this.particle_w = Math.floor(_this.img.width / _this.columns);
                _this.particle_h = Math.floor(_this.img.height / _this.rows);

                // create particles
                var bd;
                _this.particles = new Array();

                for (var i = 0; i < _this.columns; i++) {
                    for (var j = 0; j < _this.rows; j++) {
                        bd = new createjs.BitmapData(null, _this.particle_w, _this.particle_h);
                        bd.drawImage(_this.img, i * _this.particle_w, j * _this.particle_h, _this.particle_w, _this.particle_h, 0, 0, _this.particle_w, _this.particle_h);

                        var p = new djankey.Particle(_this.offset_x + i * _this.particle_w, _this.offset_y + j * _this.particle_h, bd.canvas);
                        p.damp = _this.randomRange(50, 150) / 1000;
                        p.home_force = _this.randomRange(30, 90) / 10000;
                        _this.stage.addChild(p);
                        _this.particles.push(p);
                    }
                }

                // add mouse events
                _this.stage.on("stagemousemove", _this.mouseMoved);
                _this.stage.on("stagemousedown", _this.mouseDown);
                // update label
            };
            this.mouseDown = function(evt) {
                _this.mouse_down = true;
            };
            this.mouseMoved = function(evt) {
                _this.mouse_x = evt.stageX;
                _this.mouse_y = evt.stageY;
            };
            this.randomRange = function(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            };
            this.new = function(imgPath) {
                _this.label.text = "Loading...";

                _this.imgQueue.close();
                _this.imgQueue.loadFile({id: "image", src: imgPath});
                _this.imgQueue.load();
            };


            this.update = function() {
                _this.stats.update();
                _this.stage.update();

                var len = _this.particles.length;
                var p;
                var force = -1;

                if (_this.mouse_down === true) {
                    _this.mouse_down = false;
                    force = -50;
                }

                for (var i = 0; i < len; i++) {
                    p = _this.particles[i];

                    p.addForce(_this.mouse_x, _this.mouse_y, 0, 100, force);
                    p.seekHome(p.home_force);
                    p.addDamping(p.damp);
                    p.update();

                    p.x = p.loc.x;
                    p.y = p.loc.y;
                }
            };

            this.canvas = document.getElementById(canvasID);

            if (!this.canvas || !this.canvas.getContext) {
                alert('HTML5 Canvas is not supported!');
            } else {
                this.init();
            }
        }
        return BreakImage;
    })();
    djankey.BreakImage = BreakImage;
})(djankey || (djankey = {}));


// particle.ts -> particle.js
var __extends = this.__extends || function(d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() {
        this.constructor = d;
    }
    __.prototype = b.prototype;
    d.prototype = new __();
};

(function(djankey) {
    var Particle = (function(_super) {
        __extends(Particle, _super);
        function Particle(_x, _y, ce) {
            var _this = this;
            _super.call(this, ce);
            this.loc = new createjs.Vector3D();
            this.vel = new createjs.Vector3D();
            this.acc = new createjs.Vector3D();
            this.tar_loc = new createjs.Vector3D();
            //createParticles = ():void => {
            this.update = function() {
                _this.vel = _this.vel.add(_this.acc);
                _this.loc = _this.loc.add(_this.vel);

                _this.acc.x = _this.acc.y = _this.acc.z = 0;
            };
            this.setTarLoc = function(_x, _y, _z) {
                if (typeof _z === "undefined") {
                    _z = 0;
                }
                _this.tar_loc.x = _x;
                _this.tar_loc.y = _y;
            };
            this.addForce = function(_x, _y, _z, _min_dist, _scale) {
                var _tar_loc = new createjs.Vector3D(_x, _y, _z);
                var _dir = _tar_loc.subtract(_this.loc);
                var _d = _dir.length;

                if (_d > 0 && _d < _min_dist) {
                    var _pct = 1 - (_d / _min_dist);
                    _dir.normalize();
                    _dir.scaleBy(_scale * _pct);
                    _this.acc = _this.acc.add(_dir);
                }
            };
            this.seekHome = function(_scale) {
                var _dir = _this.tar_loc.subtract(_this.loc);
                _dir.scaleBy(_scale);
                _this.acc = _this.acc.add(_dir);
            };
            this.addDamping = function(_damp) {
                var _dir = _this.acc.subtract(_this.vel);
                _dir.scaleBy(_damp);
                _this.acc = _this.acc.add(_dir);
            };

            this.x = _x;
            this.y = _y;

            this.loc.x = _x;
            this.loc.y = _y;
            this.setTarLoc(_x, _y);
        }
        return Particle;
    })(createjs.Bitmap);
    djankey.Particle = Particle;
})(djankey || (djankey = {}));