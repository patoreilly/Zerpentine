var Menus = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Menus ()
    {
        Phaser.Scene.call(this, { key: 'menus', active: false });
    },

    init: function (data)
    {
        
    },

    preload: function ()
    {

        // this.load.image('Last Duel', 'gui/Last Duel (Capcom).png');
        // this.load.image('Blood Warrior', 'gui/Blood Warrior (Kaneko).png');
        // this.load.image('Truxton', 'gui/Truxton (Toaplan).png');
        // this.load.image('Xexex', 'gui/Xexex (Konami).png');
        // this.load.image('Aurail', 'gui/Aurail (Sega).png');
        // this.load.image('Afterburner', 'gui/Afterburner (Sega).png');
        // this.load.image('Wonder Boy', 'gui/Wonder Boy (Sega).png');
        this.load.image('Hat Trick Hero', 'gui/Hat Trick Hero 95 (modified).png');
        // this.load.image('Kaiser Knuckle', 'gui/Kaiser Knuckle (Taito).png');
        // this.load.image('Major Title', 'gui/Major Title (IREM).png');
        // this.load.image('Nintendo', 'gui/Super Mario Bros 3 (Nintendo).png');

    },

    create: function ()
    {
        var bgimg = this.add.image(0,0,'chunk3').setOrigin(0).setDisplaySize(640,50).setDepth(0);

        this.add.dynamicBitmapText(0, 0, 'zerpentine_title', 'zerpentine').setOrigin(0,0.5).setScale(1).setCenterAlign().setPosition(20,25).setDepth(100);

        // menu graphic font
        var menu_font_config = {
                image: 'Bubble Memories',
                width: 16,
                height: 16,
                chars: Phaser.GameObjects.RetroFont.TEXT_SET1,
                charsPerRow: 96,
                spacing: { x: 0, y: 0 },
                offset: {y:48}
                };

                this.cache.bitmapFont.add('Menu', Phaser.GameObjects.RetroFont.Parse(this, menu_font_config));

        var rollover_font_config = {
                image: 'Bubble Memories',
                width: 16,
                height: 16,
                chars: Phaser.GameObjects.RetroFont.TEXT_SET1,
                charsPerRow: 96,
                spacing: { x: 0, y: 0 },
                offset: {y:32}
                };

                this.cache.bitmapFont.add('Menu_Rollover', Phaser.GameObjects.RetroFont.Parse(this, rollover_font_config));



        var menus = this.scene.get('menus');

        

        //var title = this.scene.get('title');
        

        

        // this.up_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        // this.down_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        // this.enter_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.escape_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        

        ///sound interface
        var tileSize = 16;

        var randomKey1 = Math.random().toString();
        var canvasFrame = this.textures.createCanvas(randomKey1, tileSize*2, tileSize);


        var randomKey = Math.random().toString();
        this.textures.generate(randomKey, { data: sound_off, pixelWidth: 1 });
        

        //draw the texture data for this frame into the sprite sheet
        canvasFrame.drawFrame(randomKey,0,0,0);
        //add the frame data for this frame into the sprite sheet
        canvasFrame.add(0, 0, 0, 0, tileSize, tileSize);

        var randomKey = Math.random().toString();
        this.textures.generate(randomKey, { data: sound_on, pixelWidth: 1 });
        

        //draw the texture data for this frame into the sprite sheet
        canvasFrame.drawFrame(randomKey,0,tileSize,0);
        //add the frame data for this frame into the sprite sheet
        canvasFrame.add(1, 0, tileSize, 0, tileSize, tileSize);

        this.sound_button = this.add.image(10, 10, randomKey1).setOrigin(0.5).setScale(1).setDepth(200).setInteractive();

        if (sound_enabled) 
        {
            this.sound_button.setFrame(1)            
        } 
        else 
        {
            this.sound_button.setFrame(0)
        }

        

        this.sound_button.on('pointerup', function () {

            if (sound_enabled)
            {
                this.sound_button.setFrame(0);
                //this.menu[1].buttons[0].setText('MUSIC off');
                sound_enabled=false;
                SIDplayer.stop();
                
                //
                
                
            }
            else
            {
                this.sound_button.setFrame(1);
                //this.menu[1].buttons[0].setText('MUSIC on');
                sound_enabled=true;
                this.initSidAudio();

                //


            }

        }, this);



        // starts music for game

        if (sound_enabled) this.initSidAudio();

        ////



        this.input.gamepad.on('down', function (pad, button, index) {

            // if (button.index==3 && sound_enabled)
            // {
            //     sound_button.setFrame(0);
            //     sound_enabled=false;
            //     SIDplayer.stop();
            // }
            if (button.index==2)
            {
                if (sound_enabled)
                {
                    this.sound_button.setFrame(0);
                    //this.menu[1].buttons[0].setText('MUSIC off');
                    sound_enabled=false;
                    SIDplayer.stop();
                }
                else
                {
                    this.sound_button.setFrame(1);
                    //this.menu[1].buttons[0].setText('MUSIC on');
                    sound_enabled=true;
                    this.initSidAudio();
                }
            }
            






            if (button.index==4)
            {
                this.scene.setVisible(false, 'rulez');
                this.scene.setVisible(false, 'bugz');
                this.scene.setVisible(false, 'about');
                this.displayHideMenu();
            }
            if (button.index==12)
            {
                var m = this.current_menu;
                this.previous_index = this.current_index;
                this.current_index--;
                if (this.current_index < 0) { this.current_index = this.menu[m].items.length-1 }
                this.menu[m].buttons[this.current_index].setFont('Menu_Rollover');
                this.menu[m].buttons[this.previous_index].setFont('Menu');
            }
            if (button.index==13)
            {
                var m = this.current_menu;
                this.previous_index = this.current_index;
                this.current_index++;
                if (this.current_index > this.menu[m].items.length-1) { this.current_index = 0 }
                this.menu[m].buttons[this.current_index].setFont('Menu_Rollover');
                this.menu[m].buttons[this.previous_index].setFont('Menu');
            }
            if (button.index==0)
            {
                if (menu_mode) this.processMenuSelection(this.current_index);
            }

        }, this);


        this.previous_index;
        this.current_index=0;
        this.current_menu=0;

        this.menu = [];

        //main menu
        this.menu[0] = {};

        
        this.menu[0].items = ['play','rulez','bugz','about'];
        this.menu[0].buttons = [];
               
        // //options menu
        // this.menu[1] = {}

        // var fullscreen_bt = fullscreen_enabled ? 'FULLSCREEN on' : 'FULLSCREEN off';

        // this.menu[1].items = ['MUSIC on',fullscreen_bt,'DONE'];
        // this.menu[1].buttons = [];

        //total set of menu buttons that can be drawn
        this.buttonsgroup = this.add.group();

        //init all menu buttons
        for (var m=0; m<this.menu.length; m++)
        {
            for (var i=0; i<this.menu[m].items.length; i++)
            {
                this.menu[m].buttons[i] = this.add.dynamicBitmapText(0, 0, 'Menu', this.menu[m].items[i]).setOrigin(0.5).setScale(1).setCenterAlign().setPosition(280+(i*100),25).setInteractive();
                this.menu[m].buttons[i].setData('index', i);
                this.menu[m].buttons[i].on('pointerup', function () 
                    {                        
                        menus.processMenuSelection(this.getData('index'));                                                
                    });

                this.buttonsgroup.add(this.menu[m].buttons[i]);
            }
        }

        // //if touch is not activated default hilight top menu item
        // if (!touchActivated)
        // {
        //     this.menu[0].buttons[0].setFont('Menu_Rollover');
        // }
        


        // add default rollover events for all buttons created thus far

        this.buttonsgroup.children.iterate( function(button)
            {
                button.on( 'pointerover',function() {

                    button.setFont('Menu_Rollover');

                    //reset current_index and un-hilite all other menu buttons
                    // var thisbuttonindex = button.getData('index');
                    // menus.current_index = thisbuttonindex;

                    // for (var i=0;i<menus.menu[menus.current_menu].buttons.length;i++)
                    // {
                    //     if (i!=thisbuttonindex)
                    //     {
                    //         menus.menu[menus.current_menu].buttons[i].setFont('Menu');
                    //     }
                    // }


                } );

                button.on( 'pointerout',function() {button.setFont('Menu')} );
            }
        );

        


        //// setup containers

        menu1_cont = this.add.container();
        menu1_cont.add(this.menu[0].buttons);// 

        // menu2_cont = this.add.container();
        // menu2_cont.add(this.menu[1].buttons);
        // menu2_cont.visible = false;

        menugui_cont = this.add.container();
        menugui_cont.add([menu1_cont]);//



        this.showMenuTween = this.tweens.add({

            targets: menugui_cont,
            x: 0,                    
            ease: 'Expo.easeOut',
            duration: 300,
            yoyo: false,
            repeat: 0,
            paused: true
            

            });

        this.hideMenuTween = this.tweens.add({

            targets: menugui_cont,
            x: 400,
            //alpha: 0,
            ease: 'Quad.easeIn',
            duration: 500,
            yoyo: false,
            repeat: 0,
            paused: true
        

            });

        /// debug global
        //debug = this.add.text(10, 10, '', { font: '10px Arial', fill: '#ffffff' });
        
    },

    displayHideMenu: function ()
    {
        

        
        if (!menu_mode)
        {
            if (!this.hideMenuTween.isPlaying())
            {
                //display - always reverts to main menu; make sure all others are off(not visible) here
                
                // //reset all buttons to non-seleceted
                // this.buttonsgroup.children.iterate( function(button)
                // {
                //     button.setFont('Menu');
                // });
        

                menu_mode = true;

                //this.scene.setActive(false, 'raycer');

                

                //title.showTitleTween();

                menu1_cont.visible = true;
                //menu2_cont.visible = false;
                this.current_menu = 0;
                this.current_index = 0;
                // //if touch is not activated default hilight top menu item
                // if (!touchActivated)
                // {
                //     this.menu[0].buttons[0].setFont('Menu_Rollover');
                // }
                // //unhightlight all other items
                // for (var i=1; i<this.menu[0].items.length; i++)
                // {
                //     this.menu[0].buttons[i].setFont('Menu');
                // }
                        
            
                this.showMenuTween.play();

                //must re-add destroyed tween after calling new scene
                this.showMenuTween = this.tweens.add({

                    targets: menugui_cont,
                    x: 0,                    
                    ease: 'Expo.easeOut',
                    duration: 600,
                    yoyo: false,
                    repeat: 0,
                    paused: true
                    

                    });

            }            
        }
        else
        {
            //hide
            if (!this.showMenuTween.isPlaying())
            {
                
                menu_mode = false;
            
                this.hideMenuTween.play();
                
                //must re-add destroyed tween after calling new scene
                this.hideMenuTween = this.tweens.add({

                    targets: menugui_cont,
                    x: 400,
                    //alpha: 0,
                    ease: 'Quad.easeIn',
                    duration: 500,
                    yoyo: false,
                    repeat: 0,
                    paused: true

                    });
            }            
        }
    },

    processMenuSelection: function(selected_index)
    {
        
        if (menu1_cont.visible)
        {
            
            switch (selected_index)
            {
                case 0:
                    this.scene.setVisible(false, 'rulez');
                    this.scene.setVisible(false, 'bugz');
                    this.scene.setVisible(false, 'about');
                    this.displayHideMenu();
                    this.startNewGame();
                    break;

                case 1:
                    if (!this.scene.isActive('rulez'))
                    {
                        this.scene.launch('rulez');
                        this.scene.bringToTop('rulez');
                    }
                    else
                    {
                        this.scene.bringToTop('rulez');
                        this.scene.setVisible(true, 'rulez');
                    }
                    
                    break;

                case 2:
                    if (!this.scene.isActive('bugz'))
                    {
                        this.scene.launch('bugz');
                        this.scene.bringToTop('bugz');
                    }
                    else
                    {
                        this.scene.bringToTop('bugz');
                        this.scene.setVisible(true, 'bugz');
                    }
                    break;

                case 3:
                    if (!this.scene.isActive('about'))
                    {
                        this.scene.launch('about');
                        this.scene.bringToTop('about');
                    }
                    else
                    {
                        this.scene.bringToTop('about');
                        this.scene.setVisible(true, 'about');
                    }
                    break;


            }
        }


        else
        {

            switch (selected_index)
            {

                case 0: //toggle sound
                    if (sound_enabled)
                    {
                        this.sound_button.setFrame(0);
                        this.menu[1].buttons[0].setText('MUSIC off');
                        sound_enabled=false;
                        SIDplayer.stop();
                    }
                    else
                    {
                        this.sound_button.setFrame(1);
                        this.menu[1].buttons[0].setText('MUSIC on');
                        sound_enabled=true;
                        this.initSidAudio();
                    }
                    break;

                case 1: //toggle fullscreen
                    if (fullscreen_enabled)
                    {
                        this.menu[1].buttons[1].setText('FULLSCREEN off');
                        fullscreen_enabled=false;
                        this.scale.stopFullscreen();
                    }
                    else
                    {
                        this.menu[1].buttons[1].setText('FULLSCREEN on');
                        fullscreen_enabled=true;
                        this.scale.startFullscreen();
                    }
                    break;

                case 2:
                    this.displayHideMenu();
                    break;
            
            }
        }


    },

    startNewGame: function()
    {
        var zerpentine = this.scene.get('zerpentine');
        demo_mode = false;
        zerpentine.newPlay();
        //this.scene.launch('hud');
    },
    startDemo: function()
    {
        // var raycer = this.scene.get('raycer');
        // raycer.newdemo();
        // this.scene.launch('hud');
    },

    update: function()
    {
        
        if (Phaser.Input.Keyboard.JustDown(this.escape_key))
        {
            this.scene.setVisible(false, 'rulez');
            this.scene.setVisible(false, 'bugz');
            this.scene.setVisible(false, 'about');
            this.displayHideMenu();
        }

        // if (Phaser.Input.Keyboard.JustDown(this.enter_key))
        // {
        //     if (menu_mode) this.processMenuSelection(this.current_index);
        // }

        // var m = this.current_menu;
        // if (Phaser.Input.Keyboard.JustDown(this.up_key))
        // {
        //     this.previous_index = this.current_index;
        //     this.current_index--;
        //     if (this.current_index < 0) { this.current_index = this.menu[m].items.length-1 }
        //     this.menu[m].buttons[this.current_index].setFont('Menu_Rollover');
        //     this.menu[m].buttons[this.previous_index].setFont('Menu');
            
        // }
        // if (Phaser.Input.Keyboard.JustDown(this.down_key))
        // {
        //     this.previous_index = this.current_index;
        //     this.current_index++;
        //     if (this.current_index > this.menu[m].items.length-1) { this.current_index = 0 }
        //     this.menu[m].buttons[this.current_index].setFont('Menu_Rollover');
        //     this.menu[m].buttons[this.previous_index].setFont('Menu');
            
        // }
        
        

        // var debugt = [];
                
        //         debugt.push('this.current_index: '+ this.current_index );
        //         debugt.push('fps: '+ Math.floor(this.sys.game.loop.actualFps.toString()) );
        //         // debugt.push('fElapsedTime: '+ fElapsedTime );
        //         // debugt.push('this.fCurrentLapTime: '+ this.fCurrentLapTime );
        //         // debugt.push('Distance: '+ this.fDistance);
        //         // debugt.push('fOffset: '+ fOffset );

        //         // debugt.push('touchYDelta: '+ touchYDelta );

                
        // debug.setText(debugt);
    },

    initSidAudio: function ()
    {
        // var SIDplayer = this.plugins.get('SIDPlayerPlugin');
        // SIDplayer.loadLocal(this.cache.binary.get('tune1'));

        SIDplayer = new jsSID(16384, 0.0005);

        if (audioIndex>=audioList.length) {audioIndex=0}
        
        

        SIDplayer.loadLocal(this.cache.binary.get(audioList[audioIndex]));

        SIDplayer.setmodel(6581);



        var i = 0;
        var max = SIDplayer.getsubtunes();

        // sidtext.setText([
        //     'Title: ' + SIDplayer.gettitle(),
        //     'Author: ' + SIDplayer.getauthor(),
        //     'Info: ' + SIDplayer.getinfo(),
        //     'Current Sub-Tune: ' + i,
        //     'Total Sub-Tunes: ' + SIDplayer.getsubtunes(),
        //     'Pref. Model: ' + SIDplayer.getprefmodel(),
        //     'Playtime: ' + SIDplayer.getplaytime(),
        //     'Playback Model: ' + SIDplayer.getmodel()
        // ]);

        SIDplayer.start(3);

        

        audioIndex++;

        
    }

});







        