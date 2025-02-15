var Setup = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Setup ()
    {
        Phaser.Scene.call(this, { key: 'setup', active: true});
    },
    init: function (data)
    {
        
    },

    preload: function ()
    {
        

        // load gui assets

        //this.load.image('mazeworm_title', 'gui/mazeworm_title.png');

        this.load.image('Bubble Memories', 'gui/Bubble Memories (Taito).png');

        this.load.image('Afterburner', 'gui/Afterburner (Sega).png');

        this.load.image('Nintendo', 'gui/Super Mario Bros 3 (Nintendo).png');

        this.load.image('mousekeys_icon', 'gui/mousekeys_icon.png');
        this.load.image('touch_icon', 'gui/touch_icon.png');
        this.load.image('gamepad_icon', 'gui/gamepad_icon.png');        

        
        

        // load spritesheets
        this.load.spritesheet('purple_explosion', 'sprites/purple_explosion.png',{ frameWidth: 32, frameHeight: 32 });

        this.load.spritesheet('sploder', 'sprites/sploder.png',{ frameWidth: 16, frameHeight: 16 }); // 6 frames

        this.load.spritesheet('atest', 'sprites/atest.png',{ frameWidth: 16, frameHeight: 16 }); // 8 frames
        this.load.spritesheet('atest3', 'sprites/atest3.png',{ frameWidth: 32, frameHeight: 32 }); // 15 frames
        this.load.spritesheet('atest7', 'sprites/atest7.png',{ frameWidth: 28, frameHeight: 22 }); // 16 frames
        this.load.spritesheet('atest8', 'sprites/atest8.png',{ frameWidth: 28, frameHeight: 32 }); // 12 frames
        this.load.spritesheet('atest9', 'sprites/atest9.png',{ frameWidth: 28, frameHeight: 24 }); // 4 frames
        this.load.spritesheet('atest10', 'sprites/atest10.png',{ frameWidth: 32, frameHeight: 24 }); // 4 frames
        this.load.spritesheet('atest11', 'sprites/atest11.png',{ frameWidth: 17, frameHeight: 16 }); // 33 frames
        this.load.spritesheet('atest12', 'sprites/atest12.png',{ frameWidth: 25, frameHeight: 26 }); // 20 frames
        this.load.spritesheet('atest14', 'sprites/atest14.png',{ frameWidth: 24, frameHeight: 17 }); // 8 frames
        this.load.spritesheet('atest17', 'sprites/atest17.png',{ frameWidth: 17, frameHeight: 18 }); // 28 frames

        // load sprites
        this.load.image('red_head', 'sprites/red_head.png');
        this.load.image('red_section', 'sprites/red_section.png');
        this.load.spritesheet('red_pop', 'sprites/red_pop.png',{ frameWidth: 16, frameHeight: 16 });

        this.load.image('green_head', 'sprites/green_head.png');
        this.load.image('green_section', 'sprites/green_section.png');
        this.load.spritesheet('green_pop', 'sprites/green_pop.png',{ frameWidth: 16, frameHeight: 16 });

        this.load.image('cyan_head', 'sprites/cyan_head.png');
        this.load.image('cyan_section', 'sprites/cyan_section.png');
        this.load.spritesheet('cyan_pop', 'sprites/cyan_pop.png',{ frameWidth: 16, frameHeight: 16 });

        this.load.spritesheet('blue_pop', 'sprites/blue_pop.png',{ frameWidth: 16, frameHeight: 16 });
        
        
        

        // load audio list maintained in globals.js
        for (var i = 0; i < audioList.length; i++)
        {
            this.load.binary(audioList[i], 'audio/'+audioList[i]);
        }


        //////////////////
        
        loadfile_index = 0;

        var progress = this.add.graphics().setDepth(99);

        var text = this.add.text(10, 50, '(debug text)', { font: '10px Courier', fill: '#ffffff' }).setDepth(99);
        var text2 = this.add.text(10, 72, '(debug text)', { font: '10px Courier', fill: '#ffffff' }).setDepth(99);
        

        this.load.on('progress', function (value) {
            text.setText('loading...'+Math.floor(100*value)+'%');
            progress.clear();
            progress.fillStyle(0x33ff04, 1);
            progress.fillRect(0, 40, 320 * value, 10);
        });
        
        this.load.on('fileprogress', function (file,value) {
            //text.setText(Math.floor(100*value)+'%');          
            text2.setText(file.key);            
            // text3.setText(value);
            // progress.clear();
            // progress.fillStyle(0x00cc11, 1);
            // progress.fillRect(0, 0, 320 * value, 5);            
        });

        this.load.on('filecomplete', this.showFile, this);

        this.load.on('complete', function () {

            progress.destroy();            
            text.destroy();
            text2.destroy();
            for (var e=0; e<file_thumbs.length; e++)
            {
                file_thumbs[e].destroy();
            }
            

        });

    },


    showFile: function (key, type, texture)
    {
        file_thumbs[loadfile_index] = this.add.image(10+20*(loadfile_index%16), 100+20*(Math.floor(loadfile_index/16)), key).setDisplaySize(20, 20);
        

        
        loadfile_index++;

        // if (key=='load_scrn_bkgd')
        // {
        //     this.add.image(0, 0, key).setOrigin(0).setDisplaySize(320, 200);
        // }

        if (key=='Nintendo')
        {
            var nt_config1 = {
            image: 'Nintendo',
            width: 8,
            height: 8,
            chars: Phaser.GameObjects.RetroFont.TEXT_SET1,
            charsPerRow: 96,
            spacing: { x: 0, y: 0 },
            offset: {y:0}
            };

            var nt_config2 = {
            image: 'Nintendo',
            width: 8,
            height: 8,
            chars: Phaser.GameObjects.RetroFont.TEXT_SET1,
            charsPerRow: 96,
            spacing: { x: 0, y: 0 },
            offset: {y:8}
            };

            this.cache.bitmapFont.add('headtext', Phaser.GameObjects.RetroFont.Parse(this, nt_config1));
            this.cache.bitmapFont.add('foottext', Phaser.GameObjects.RetroFont.Parse(this, nt_config2));

            hsv = Phaser.Display.Color.HSVColorWheel();

            var text0 = this.add.dynamicBitmapText(0, 0, 'headtext', 'DragonFLY').setOrigin(0).setScale(2).setPosition(8,8).setDepth(200);
            var text1 = this.add.dynamicBitmapText(0, 0, 'headtext', '          v 0.4').setOrigin(0).setScale(2).setPosition(8,8).setDepth(200);
            var text2 = this.add.dynamicBitmapText(0, 0, 'headtext', 'presents...').setOrigin(0).setScale(2).setPosition(8,28).setDepth(200);

            text0.setDisplayCallback(this.textCallback);
        } 
    },

    textCallback: function (data) 
    {


        data.tint.topLeft = hsv[Math.floor(i)].color;
        

        i += 0.5;

        if (i >= hsv.length)
        {
            i = 0;
        }
        // data.parent.alpha -= .0005;
        // if (data.parent.alpha<.5) data.parent.alpha=1.0;
        //console.log(data);
        

        return data;
    },
    
    
    create: function ()
    {

        //create gui textures for use in all scenes
        this.textures.generate('chunk3', { data: ['D'], pixelWidth: 1});
        this.textures.generate('a_menu', { data: accessMenuData, pixelWidth: 1});

        /// debug global
        debug = this.add.text(160, 100, '', { font: '10px Arial', fill: '#00ff00' });

        // access to functions belonging to other scenes in Phaser: this.scene.get
        // use worker variable to hold the scene object accessed thru scene key
        // i.e.

        //var demo = this.scene.get('demo');

        // where the worker and the key are the same name
        // thus, 'this.myfunction()' becomes 'scenekey.myfunction()'




        startFlag=false;



        // this.load.spritesheet('atest', 'sprites/atest.png',{ frameWidth: 16, frameHeight: 16 }); // 8 frames
        // this.load.spritesheet('atest2', 'sprites/atest2.png',{ frameWidth: 16, frameHeight: 16 }); // 6 frames
        // this.load.spritesheet('atest3', 'sprites/atest3.png',{ frameWidth: 32, frameHeight: 32 }); // 15 frames
        // this.load.spritesheet('atest7', 'sprites/atest7.png',{ frameWidth: 28, frameHeight: 22 }); // 16 frames
        // this.load.spritesheet('atest8', 'sprites/atest8.png',{ frameWidth: 28, frameHeight: 32 }); // 12 frames
        // this.load.spritesheet('atest9', 'sprites/atest9.png',{ frameWidth: 28, frameHeight: 24 }); // 4 frames
        // this.load.spritesheet('atest10', 'sprites/atest10.png',{ frameWidth: 32, frameHeight: 24 }); // 4 frames
        // this.load.spritesheet('atest11', 'sprites/atest11.png',{ frameWidth: 17, frameHeight: 16 }); // 33 frames
        // this.load.spritesheet('atest12', 'sprites/atest12.png',{ frameWidth: 25, frameHeight: 26 }); // 20 frames
        // this.load.spritesheet('atest14', 'sprites/atest14.png',{ frameWidth: 24, frameHeight: 17 }); // 8 frames
        // this.load.spritesheet('atest17', 'sprites/atest17.png',{ frameWidth: 17, frameHeight: 18 }); // 28 frames
        


        // pre-load animations used in other scenes

        this.anims.create({
                key: 'purple_explosion_animation',
                frames: this.anims.generateFrameNumbers('purple_explosion'),
                frameRate: 20,
                repeat: 0
            });

        this.anims.create({
                key: 'blue_pop_animation',
                frames: this.anims.generateFrameNumbers('blue_pop'),
                frameRate: 20,
                repeat: 0
                //yoyo: true
            });

        this.anims.create({
                key: 'green_pop_animation',
                frames: this.anims.generateFrameNumbers('green_pop'),
                frameRate: 20,
                repeat: 0
                //yoyo: true
            });

        this.anims.create({
                key: 'red_pop_animation',
                frames: this.anims.generateFrameNumbers('red_pop'),
                frameRate: 20,
                repeat: 0
                //yoyo: true
            });

        this.anims.create({
                key: 'cyan_pop_animation',
                frames: this.anims.generateFrameNumbers('cyan_pop'),
                frameRate: 20,
                repeat: 0
                //yoyo: true
            });

        this.anims.create({
                key: 'sploder_animation',
                frames: this.anims.generateFrameNumbers('sploder'),
                frameRate: 20,
                repeat: -1
                //yoyo: true
            });



        
        this.anims.create({
                key: 'spawnloop_animation',
                frames: this.anims.generateFrameNumbers('atest3'),
                frameRate: 20,
                repeat: -1
                //yoyo: true
            });
        
        this.anims.create({
                key: 'atest3_animation',
                frames: this.anims.generateFrameNumbers('atest3'),
                frameRate: 20,
                repeat: 0
                //yoyo: true
            });
        

        
        this.anims.create({
                key: 'atest9_animation',
                frames: this.anims.generateFrameNumbers('atest9'),
                frameRate: 20,
                repeat: -1
                //yoyo: true
            });
        
        this.anims.create({
                key: 'atest10_animation',
                frames: this.anims.generateFrameNumbers('atest10'),
                frameRate: 20,
                repeat: -1
                //yoyo: true
            });

        this.anims.create({
                key: 'atest11_animation',
                frames: this.anims.generateFrameNumbers('atest11'),
                frameRate: 20,
                repeat: -1
                //yoyo: true
            });
        
        
        
        

        
        //this.textures.generate('chunk3', { data: ['3'], pixelWidth: 1});
        //bgimg = this.add.image(0,0,'chunk3').setAlpha(.25).setOrigin(0).setDisplaySize(320,200).setDepth(0);


        //  animated sprite set up for 2d display purpose 
            //  must be loaded as .spritesheet with frame params and added as .sprite
            // var randomKey3 = Math.random().toString();

            // this.anims.create({
            //     key: randomKey3,
            //     frames: this.anims.generateFrameNumbers('flybug'),
            //     frameRate: 60,
            //     repeat: -1
            //     //yoyo: true
            // });

        
        var config0 = {
            image: 'Bubble Memories',
            width: 16,
            height: 16,
            chars: Phaser.GameObjects.RetroFont.TEXT_SET1,
            charsPerRow: 96,
            spacing: { x: 0, y: 0 },
            //lineSpacing: 16,
            offset: {y:0}
        };

        this.cache.bitmapFont.add('zerpentine_title', Phaser.GameObjects.RetroFont.Parse(this, config0));

        this.add.dynamicBitmapText(0, 0, 'zerpentine_title', 'zerpentine').setOrigin(0.5).setScale(2).setCenterAlign().setPosition(460,36).setDepth(100);



        var config1 = {
            image: 'Afterburner',
            width: 8,
            height: 8,
            chars: Phaser.GameObjects.RetroFont.TEXT_SET1,
            charsPerRow: 96,
            spacing: { x: 0, y: 0 },
            lineSpacing: 8,
            offset: {y:24}
        };

        this.cache.bitmapFont.add('Afterburner1', Phaser.GameObjects.RetroFont.Parse(this, config1));


        var text1 = this.add.dynamicBitmapText(0, 0, 'headtext', " keyboard mouse \n ").setOrigin(0.5,1).setScale(2).setCenterAlign().setPosition(320,120).setDepth(100);
        var text2 = this.add.dynamicBitmapText(0, 0, 'headtext', " touchscreen \n ").setOrigin(0.5,1).setScale(2).setCenterAlign().setPosition(320,220).setDepth(100);
        var text3 = this.add.dynamicBitmapText(0, 0, 'headtext', " gamepad \n ").setOrigin(0.5,1).setScale(2).setCenterAlign().setPosition(320,320).setDepth(100);
                
        var hitarea1 = this.add.rectangle(text1.x, text1.y, text1.width + 40, text1.height + 40, 0x00ff00, 0.45).setInteractive();
        var hitarea2 = this.add.rectangle(text2.x, text2.y, text2.width + 40, text2.height + 40, 0xff00ff, 0.45).setInteractive();
        var hitarea3 = this.add.rectangle(text3.x, text3.y, text3.width + 40, text3.height + 40, 0x00ffff, 0.45).setInteractive();

        this.add.sprite(320, 120, 'mousekeys_icon').setOrigin(.5,0).setScale(4);   
        this.add.sprite(320, 220, 'touch_icon').setOrigin(.5,0).setScale(4);   
        this.add.sprite(320, 320, 'gamepad_icon').setOrigin(.5,0).setScale(4);  


        hitarea1.on('pointerup', function () {
             
            sound_enabled = true;

            //this.scale.startFullscreen();

            //screen.orientation.lock('landscape');
            
            touchActivated = false;

            
            // music = this.sound.add('theme');
            // music.play({loop: true});

            this.add.dynamicBitmapText(0, 0, 'Afterburner1', 'getting ready..').setOrigin(0.5).setScale(4).setCenterAlign().setPosition(320,200).setDepth(100);
            startFlag=true;//this.scene.start('demo');
            

        }, this);

        hitarea2.on('pointerup', function () {

            sound_enabled = true;

            this.scale.startFullscreen();

            screen.orientation.lock('landscape');
            
            touchActivated = true;
            fullscreen_enabled = true;

            // music = this.sound.add('theme');
            // music.play({loop: true});

            this.add.dynamicBitmapText(0, 0, 'Afterburner1', 'getting ready..').setOrigin(0.5).setScale(4).setCenterAlign().setPosition(320,200).setDepth(100);
            startFlag=true;//this.scene.start('demo');
            

        }, this);

        hitarea3.on('pointerup', function () {

            sound_enabled = true;

            //this.scale.startFullscreen();

            //screen.orientation.lock('landscape');
            
            touchActivated = false;

            // music = this.sound.add('theme');
            // music.play({loop: true});

            this.add.dynamicBitmapText(0, 0, 'Afterburner1', 'getting ready..').setOrigin(0.5).setScale(4).setCenterAlign().setPosition(320,200).setDepth(100);
            startFlag=true;//this.scene.start('demo');
            

        }, this);

        
        this.input.gamepad.once('down', function (pad, button, index) {

        //text_gamepad.setText('Playing with ' + pad.id + ' index: ' + pad.index);

        pad.setAxisThreshold(0.3);

        gamepad = pad;

        sound_enabled = true;

        //this.scale.startFullscreen();

        touchActivated = false;


        // music = this.sound.add('theme');
        // music.play({loop: true});

        

        this.add.dynamicBitmapText(0, 0, 'Afterburner1', 'getting ready..').setOrigin(0.5).setScale(4).setCenterAlign().setPosition(320,200).setDepth(100);
        startFlag=true;//this.scene.start('demo');

        }, this);


        
        text5 = this.add.dynamicBitmapText(0, 0, 'foottext', 'no gamepad detected').setOrigin(0).setScale(2).setPosition(640,380).setDepth(200);

        this.tweens.add({
            targets: text5,
            x: -320,
            ease: 'none',
            duration: 4000,
            yoyo: false,
            repeat: -1
        });
        
        

        

        this.events.on('shutdown', this.shutdown, this);
    },

    shutdown: function ()
    {

        //  We need to clear keyboard events, or they'll stack up when the Menu is re-run
        this.input.keyboard.shutdown();
    },
    update: function ()
    {
        



        if (startFlag)
        {
            this.scene.start('zerpentine');
        }        
        else if (this.input.gamepad.total === 0)// exit update loop if no gamepad detected
        {
            return;
        }

        


        
        var pads = this.input.gamepad.gamepads;
        var pad;

        for (var i = 0; i < pads.length; i++)
        {
            pad = pads[i];

            if (!pad)
            {
                continue;
            }
            else
            {
                text5.setText('gamepad detected press any button '+pad.id );
            }
        }
        
        

        


        
        

    }

});


