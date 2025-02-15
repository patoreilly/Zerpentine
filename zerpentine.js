var Zerpentine = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Zerpentine ()
    {
        Phaser.Scene.call(this, { key: 'zerpentine' });
    },

    init: function (data)
    {
        
    },

    preload: function ()
    {
        this.load.image('mushroom', 'sprites/mushroom.png');
        this.load.image('butterfly', 'sprites/butterfly.png');
        this.load.image('spider', 'sprites/spider.png');
        this.load.image('spider_violet', 'sprites/spider_violet.png');
        this.load.image('spideregg', 'sprites/spideregg.png');
        this.load.image('mazetiles', 'sprites/mazetiles_v1.png');

    },

    create: function ()
    {   
        
        
        this_context = this;

        

        //universal params
        this.mazeWidth = 19;
        this.mazeHeight = 10;
        this.safetile = 1;
        this.gridsize = 16;
        this.speed = 90;
        this.threshold = 3;
        this.turnSpeed = 150;
        this.opposites = [ _NONE, _RIGHT, _LEFT, _DOWN, _UP ];

        this.numEnemies = 6;

        this.player_dead = false;

        

        var nt_config1 = {
        image: 'Nintendo',
        width: 8,
        height: 8,
        chars: Phaser.GameObjects.RetroFont.TEXT_SET1,
        charsPerRow: 96,
        spacing: { x: 0, y: 0 },
        lineSpacing: 8,
        offset: {y:0}
        };

        this.cache.bitmapFont.add('bonustext', Phaser.GameObjects.RetroFont.Parse(this, nt_config1));

        


        

        var tileSize = 16;

        this.mazeTilesetImage={};

        var mazetilesetcanvas = Math.random().toString();

        this.mazeTilesetImage.buffer = this.textures.createCanvas(mazetilesetcanvas, 18*tileSize, tileSize);

        this.mazeTilesetImage.srcimg = this.textures.get('mazetiles').getSourceImage();

        this.mazeTilesetImage.context = this.mazeTilesetImage.buffer.getContext('2d', {willReadFrequently:true});

        var srcimg = this.mazeTilesetImage.srcimg;

        this.mazeTilesetImage.context.drawImage(srcimg, 0,0,srcimg.width,srcimg.height,0,0,this.mazeTilesetImage.buffer.width, this.mazeTilesetImage.buffer.height);

        var imageData = this.mazeTilesetImage.context.getImageData(0, 0, this.mazeTilesetImage.buffer.width, this.mazeTilesetImage.buffer.height);

        this.mazeTilesetImage.imagedata = imageData;

        this.mazeTilesetImage.pixels = imageData.data;

        this.mazeTilesetImage.waveData = Phaser.Math.SinCosTableGenerator(this.mazeTilesetImage.buffer.width, 5, 5, 80);

        this.mazeTilesetImage.buffer.refresh();



        

        // Creating a blank tilemap and layer with the specified dimensions
        this.map = this.make.tilemap({ tileWidth: tileSize, tileHeight: tileSize, width: (this.mazeWidth*2)+1, height: (this.mazeHeight*2)+1});


        var tiles = this.map.addTilesetImage(mazetilesetcanvas);

        var layerKey = Math.random().toString();
        var layer = this.map.createBlankDynamicLayer(layerKey, tiles);
        layer.setScale(1);

        //this.map.setCollision([ 2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17 ]);


        // init animated sprites
        this.animated_group = this.add.group();

        var a_sprite; 

        a_sprite = this.physics.add.sprite( 0, 0,'atest9').play('atest9_animation').setDepth(200);

        a_sprite.package_sprite = this.add.sprite( 0, 0,'sploder').play('sploder_animation').setDepth(200).setVisible(true);

        a_sprite.busy = true;

        a_sprite.followerdata = 0;
        a_sprite.path = new Phaser.Curves.Path(a_sprite.x, a_sprite.y);
        //a_zsprite.path.lineTo([ 100,640 ]);
        // a_sprite.path.splineTo([ 160,136,440,280,640,56,400,496,100,250 ]);
        // a_sprite.path.closePath();

        a_sprite.path.quadraticBezierTo(Phaser.Math.Between(100,700), Phaser.Math.Between(100,700), a_sprite.x+ Phaser.Math.Between(-100,+100)*5, a_sprite.y+ Phaser.Math.Between(-100,100)*5);

        this.tweens.add({
            targets: a_sprite,
            followerdata: 1,
            ease: 'none',
            duration: 8000,
            yoyo: 0,
            repeat: -1,

            onRepeat: function (tw,zs) { 

                // console.log(tw);
                // console.log(zs);
                zs.followerdata=0;
                zs.path = new Phaser.Curves.Path(zs.x, zs.y); 
                zs.path.quadraticBezierTo(Phaser.Math.Between(100,700), Phaser.Math.Between(100,700), zs.x+ Phaser.Math.Between(-100,+100)*5, zs.y+ Phaser.Math.Between(-100,100)*5);
                //zs.path.lineTo( Phaser.Math.Between(0,1280), Phaser.Math.Between(0,1280) ); 
            }    

            });

        a_sprite.move = function()
        {
            this.x = this.path.getPoint(this.followerdata).x;           
            this.y = this.path.getPoint(this.followerdata).y;

            this.package_sprite.x = this.x;
            this.package_sprite.y = this.y+16;
        };

        this.animated_group.add(a_sprite);

        // next sprite

        a_sprite = this.physics.add.sprite( 0, 0,'atest10').play('atest10_animation').setDepth(200);

        a_sprite.package_sprite = this.add.sprite( 0, 0,'cyan_section').setDepth(200).setVisible(false);

        a_sprite.busy = false;

        a_sprite.followerdata = 0;
        a_sprite.path = new Phaser.Curves.Path(a_sprite.x, a_sprite.y);
        //a_zsprite.path.lineTo([ 100,640 ]);
        a_sprite.path.splineTo([ 160,136,440,280,640,56 ]);
        //a_sprite.path.closePath();

        //a_zsprite.path.quadraticBezierTo(Phaser.Math.Between(320,960), Phaser.Math.Between(320,960), a_zsprite.x+ Phaser.Math.Between(-100,+100)*5, a_zsprite.y+ Phaser.Math.Between(-100,100)*5);

        this.tweens.add({
            targets: a_sprite,
            followerdata: 1,
            ease: 'none',
            duration: 8000,
            yoyo: 0,
            repeat: -1

            // onRepeat: function (tw,zs) { 

            //     // console.log(tw);
            //     // console.log(zs);
            //     zs.followerdata=0;
            //     zs.path = new Phaser.Curves.Path(zs.x, zs.y); 
            //     zs.path.quadraticBezierTo(Phaser.Math.Between(320,960), Phaser.Math.Between(320,960), zs.x+ Phaser.Math.Between(-100,+100)*5, zs.y+ Phaser.Math.Between(-100,100)*5);
            //     //zs.path.lineTo( Phaser.Math.Between(0,1280), Phaser.Math.Between(0,1280) ); 
            // }    

            });

        a_sprite.move = function()
        {
            this.x = this.path.getPoint(this.followerdata).x;           
            this.y = this.path.getPoint(this.followerdata).y;

            this.package_sprite.x = this.x;
            this.package_sprite.y = this.y+16;
        };

        this.animated_group.add(a_sprite);
        
        this.animated_array = this.animated_group.getChildren();

        this.flea = this.animated_array[0];
        this.winger = this.animated_array[1];




        // stationary objects (mushrooms,butterflies,sploders,spidereggs,skiller)
        // create array for managing positions so no overlapping occurs, initializing it with player's starting postion
        this.so_positions = [ { x:this.mazeWidth*16+8, y:this.mazeHeight*16-8 } ];


        // init sploder sprites
        this.sploder_group = this.add.group();

        for (var t=0;t<10;t++)
        {
            var newPosition = this.getUnusedRandomMazePosition();

            var sp = this.physics.add.sprite( newPosition.x, newPosition.y ,'sploder').play('sploder_animation');
            this.sploder_group.add(sp);
        }
        this.sploder_array = this.sploder_group.getChildren();


        // init spider killer sprites
        this.skiller_group = this.add.group();

        for (var t=0;t<1;t++)
        {
            var newPosition = this.getUnusedRandomMazePosition();

            var sk = this.physics.add.sprite( newPosition.x, newPosition.y ,'atest11').play('atest11_animation');
            this.skiller_group.add(sk);
        }
        this.skiller_array = this.skiller_group.getChildren();
        

        // init spideregg sprites
        this.spideregg_group = this.add.group();

        for (var t=0;t<10;t++)
        {
            var newPosition = this.getUnusedRandomMazePosition();

            var se = this.physics.add.sprite( newPosition.x, newPosition.y ,'spideregg');
            se.index = t;
            this.spideregg_group.add(se);
        }
        this.spideregg_array = this.spideregg_group.getChildren();

        
        // init butterfly sprites
        this.butterfly_group = this.add.group();

        for (var t=0;t<0;t++)
        {
            var newPosition = this.getUnusedRandomMazePosition();

            var bf = this.physics.add.sprite( newPosition.x, newPosition.y ,'butterfly');
            bf.zoomTo = Phaser.Math.RND.realInRange(.8, 1.8);            
            this.butterfly_group.add(bf);
        }
        this.butterfly_array = this.butterfly_group.getChildren();



        // init mushroom sprites
        this.mushroom_group = this.add.group();

        for (var t=0;t<12;t++)
        {
            var newPosition = this.getUnusedRandomMazePosition();

            var mush = this.physics.add.sprite( newPosition.x, newPosition.y ,'mushroom');
            mush.gapfactor = Phaser.Math.RND.realInRange(.15, .55);
            if (t%2 == 0)
            {
                mush.newmaze = true;
                mush.tint = 255;
            }

            mush.marker = {};
            mush.marker.x = this.map.worldToTileX(mush.x);
            mush.marker.y = this.map.worldToTileY(mush.y);

            this.mushroom_group.add(mush);
        }
        this.mushroom_array = this.mushroom_group.getChildren();


        // end stationary objects





        

        // init enemy sprite(s)

        this.enemy_group = this.add.group();


        for (var q=0;q<this.numEnemies;q++)
        {
            var x,y;
            var lb = 24;                   //left maze boundary
            var rb = this.mazeWidth*32-8;  //right maze boundary
            var tb = 24;                   //top maze boundary
            var bb = this.mazeHeight*32-8; //bottom maze boundary

            switch (q)
            {
                case 0: x=lb;y=tb;break;
                case 1: x=lb;y=bb;break;
                case 2: x=rb;y=tb;break;
                case 3: x=rb;y=bb;break;
                case 4: x=lb;y=tb;break;
                case 5: x=lb;y=bb;break;
                case 6: x=rb;y=tb;break;
                case 7: x=rb;y=bb;break;
                case 8: x=lb;y=tb;break;
                case 9: x=lb;y=bb;break;
                case 10: x=rb;y=tb;break;
                case 11: x=rb;y=bb;break;
            }
            var enemy = this.physics.add.sprite(x,y,'red_head').setDepth(100).setAngle(90);
            
            enemy.eindex = q;
            enemy.type = 'snake';
            enemy.snakeSection = [];
            enemy.snakePath = [];
            enemy.speed = Phaser.Math.RND.realInRange(1.2, 2.2);
            enemy.snakeSpacer = Math.round((3/enemy.speed)*5);

            enemy.numSnakeSections = 5;

            enemy.status='red';

            //enemy.body_group = this.add.group();

            enemy.emarker = {};
            enemy.turnPoint = {};
            enemy.directions = [ null, null, null, null, null ];
            enemy.current = _DOWN;
            enemy.turning = _NONE;

            enemy.AI_turnTo = _NONE;
            enemy.saved_emarker = {x:1,y:8};
            enemy.safe_tile_list = [];
            enemy.newFlag = false;

            //  Init player snakeSection array
            for (var i = 0; i < enemy.numSnakeSections; i++)
            {
                enemy.snakeSection[i] = this.physics.add.sprite(24, 136, 'red_section').setDepth(99-i); 
                enemy.snakeSection[i].eindex = q;
                //enemy.body_group.add(enemy.snakeSection[i]);
            }            
            //  Init player snakePath array
            for (var i = 0; i < (enemy.numSnakeSections+1) * enemy.snakeSpacer; i++)
            {
                enemy.snakePath[i] = {x:24,y:136,angle:0};
            }

            this.enemy_group.add(enemy);
        }


        this.enemy_array = this.enemy_group.getChildren();


        //demobot

        demobot = this.physics.add.sprite(-100,-100,'cyan_head').setDepth(100).setAngle(90).setVisible(false);
            
        demobot.eindex = q;
        demobot.type = 'snake';
        demobot.snakeSection = [];
        demobot.snakePath = [];
        demobot.speed = 1.8;
        demobot.snakeSpacer = Math.round((3/demobot.speed)*5);

        demobot.numSnakeSections = 4;

        //demobot.status='red';

        //demobot.body_group = this.add.group();

        demobot.marker = {};
        demobot.emarker = {};
        demobot.turnPoint = {};
        demobot.directions = [ null, null, null, null, null ];
        demobot.current = _DOWN;
        demobot.turning = _NONE;

        demobot.AI_turnTo = _NONE;
        demobot.saved_marker = {};
        demobot.saved_emarker = {x:1,y:8};
        demobot.safe_tile_list = [];
        demobot.newFlag = false;

        //  Init player snakeSection array
        for (var i = 0; i < demobot.numSnakeSections; i++)
        {
            demobot.snakeSection[i] = this.physics.add.sprite(demobot.x-(i+1)*demobot.snakeSpacer, demobot.y, 'cyan_section').setDepth(99-i).setVisible(false); 
            demobot.snakeSection[i].eindex = q;
            demobot.snakeSection[i].type = 'normal';
        }            
        //  Init player snakePath array
        for (var i = 0; i < (demobot.numSnakeSections+1) * demobot.snakeSpacer; i++)
        {
            demobot.snakePath[i] = {x:demobot.x-i,y:demobot.y,angle:0};
        }
        // init demo_array as dymanically updated group spawned array
        this.demo_group = this.add.group();
        for (var i=0;i<this.enemy_array.length;i++)
        {
            this.demo_group.add(this.enemy_array[i]);
        }
        this.demo_group.add(demobot);
        this.demo_array = this.demo_group.getChildren();


        
        //player worm params
        //this.marker = {};
        this.turnPoint = {};
        
        this.current = _NONE;
        this.turning = _NONE;
        
        //this.saved_marker = {};
        


        // init player sprite(s)

        player = this.physics.add.sprite(-100,-100,'cyan_head').setDepth(100).setVisible(false);

        player.sametile = true;
        player.marker = {};
        player.saved_marker = {};
        player.directions = [ null, null, null, null, null ];

        player.snakeSection = [];
        player.snakePath = [];
        player.speed = 2.0;//1.5;
        player.snakeSpacer = Math.round((3/player.speed)*5);

        player.numSnakeSections = 4;

        //player.body_group = this.add.group();

        
        for (var i = 0; i < player.numSnakeSections; i++)
        {
            player.snakeSection[i] = this.physics.add.sprite(player.x-(i+1)*player.snakeSpacer, player.y, 'cyan_section').setDepth(99-i).setVisible(false);
            player.snakeSection[i].type = 'normal';          
        }
        
        //  Init player snakePath array
        for (var i = 0; i < (player.numSnakeSections+1) * player.snakeSpacer; i++)
        {
            player.snakePath[i] = {x:player.x-i,y:player.y,angle:0};
        }


        //maze generation
        

        this.mainMaze = this.generateMaze(this.mazeWidth,this.mazeHeight);
        this.displayMaze(this.mainMaze, 0.0);


        



        // init UIs
        cursors = this.input.keyboard.createCursorKeys();

        // activates gamepad in this scene
        this.input.gamepad.once('down', function (pad, button, index) {
            pad.setAxisThreshold(0.3);
            gamepad = pad;
            }, this);


        // set up checks to prevent direction jerking
        this.last_direction_pressed;

        this.input.gamepad.on('down', function (pad, button, index) {

            if (button.index==12) { this.last_direction_pressed = _UP; }
            if (button.index==13) { this.last_direction_pressed = _DOWN; }
            if (button.index==14) { this.last_direction_pressed = _LEFT; }
            if (button.index==15) { this.last_direction_pressed = _RIGHT; }

        }, this);

        // for keyboard control checks in checkKeys()
        this.up_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.down_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.left_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.right_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        

        // collisions - enemy snakes vs spidereggs
        for (var y=0;y<this.enemy_array.length;y++)
        {
            if (this.enemy_array[y].type == 'snake') { this.physics.add.overlap(this.enemy_array[y], this.spideregg_group, this.do_spideregg); }
        }
        

        // collisions - player
        this.physics.add.overlap(player, this.skiller_group, this.do_skiller);
        this.physics.add.overlap(player, this.sploder_group, this.do_sploder);
        this.physics.add.overlap(player, this.spideregg_group, this.do_spideregg);
        this.physics.add.overlap(player, this.mushroom_group, this.do_mush);
        this.physics.add.overlap(player, this.butterfly_group, this.do_bf);


        this.physics.add.overlap(player, this.enemy_group, this.p2ehead_collision);

        for (var y=0;y<this.enemy_array.length;y++)
        {
            if (this.enemy_array[y].type == 'snake') { this.physics.add.overlap(player, this.enemy_array[y].snakeSection, this.p2ebody_collision); }
        }

        this.physics.add.overlap(this.enemy_group, player.snakeSection, this.e2pbody_collision); 

        this.physics.add.overlap(this.winger, player.snakeSection, this.winger_collision);
        

        // collisions - demobot
        this.physics.add.overlap(demobot, this.skiller_group, this.do_skiller);
        this.physics.add.overlap(demobot, this.sploder_group, this.do_sploder);
        this.physics.add.overlap(demobot, this.spideregg_group, this.do_spideregg);
        this.physics.add.overlap(demobot, this.mushroom_group, this.do_mush);
        this.physics.add.overlap(demobot, this.butterfly_group, this.do_bf);


        this.physics.add.overlap(demobot, this.enemy_group, this.p2ehead_collision);

        for (var y=0;y<this.enemy_array.length;y++)
        {
            if (this.enemy_array[y].type == 'snake') { this.physics.add.overlap(demobot, this.enemy_array[y].snakeSection, this.p2ebody_collision); }
        }

        this.physics.add.overlap(this.enemy_group, demobot.snakeSection, this.e2pbody_collision); 

        this.physics.add.overlap(this.winger, demobot.snakeSection, this.winger_collision); 
        



        /// update enemy colors

        if (demo_mode)
        {
            this.update_enemy_colors(demobot);
        }
        else
        {
            this.update_enemy_colors(player);
        }

        






        /// launch touch input gui
        if (touchActivated)
        {
            this.scene.launch('touchgui');
        }
        
        /// launch menus if not already launched
        if (!this.scene.isActive('menus'))
        {
            this.scene.launch('menus');
        }
        







        // cameras setup

        myCam = this.cameras.main;



        if (demo_mode)
        {
            demobot.x = this.mazeWidth*16+8;
            demobot.y = this.mazeHeight*16-8;
            demobot.visible = true;
            for (var i = 0; i < demobot.numSnakeSections; i++)
            {
                demobot.snakeSection[i].x = demobot.x-(i+1)*demobot.snakeSpacer;
                demobot.snakeSection[i].y = demobot.y;
                demobot.snakeSection[i].setVisible(true);             
            }
            myCam.centerOn(demobot.x,demobot.y);
            //myCam.startFollow(demobot, true);
        }
        else
        {

            player.x = this.mazeWidth*16+8;
            player.y = this.mazeHeight*16-8;
            player.visible = true
            for (var i = 0; i < player.numSnakeSections; i++)
            {
                player.snakeSection[i].x = player.x-(i+1)*player.snakeSpacer;
                player.snakeSection[i].y = player.y;
                player.snakeSection[i].setVisible(true);             
            }
            myCam.centerOn(player.x,player.y);
            //myCam.startFollow(player, true);
        }
        
        //myCam.zoomTo(.5);







        //this.cameras.main.setZoom(1);
        //this.cameras.main.centerOn(0, 0);

        // cont = this.add.container();
        // cont.add([guide_left,guide_right,guide_up,guide_down, guide_multi]);

        // //  Add in a new camera, the same size and position as the main camera
        // UICam = this.cameras.add();

        // //  The main camera will not render the container
        // this.cameras.main.ignore(cont);

        // //  The new UI Camera will not render the background image
        // camera_ignorestuff = [this.enemy_group, player, player.snakeSection, this.butterfly_group, this.mushroom_group, this.animated_group, layer];

        // for (var t=0;t<this.enemy_array.length;t++)
        // {
        //     camera_ignorestuff.push(this.enemy_array[t].snakeSection);
        // }
        // UICam.ignore(camera_ignorestuff);



    },


    getUnusedRandomMazePosition: function()
    {
        var randomX = 24+(32*Phaser.Math.Between(0, this.mazeWidth-1));
        var randomY = 24+(32*Phaser.Math.Between(0, this.mazeHeight-1));
        var newPosition = {x:randomX, y:randomY};

        var positionExists = this.so_positions.find( 
            function checkForPosition(value,index,array) 
                {
                    return (value.x==newPosition.x && value.y==newPosition.y)
                } 
            );

        if (positionExists==undefined)
        {
            this.so_positions.push(newPosition);
            return newPosition;
        }
        else
        {
            return this.getUnusedRandomMazePosition();
        }
    },


    explosion_callback: function(anim,frame,sprite)
    {
        sprite.destroy(true);
    },

    explosion_collision: function(sprite1,sprite2)
    {
        if (sprite1.type=='snake')
            {
                for (var i=0;i<sprite1.numSnakeSections;i++)
                {
                    sprite1.snakeSection[i].setVisible(false);
                    var x=sprite1.snakeSection[i].x;
                    var y=sprite1.snakeSection[i].y;
                    
                    if (sprite1.status !='red') this_context.add.sprite(x, y,'green_pop').play('green_pop_animation').setDepth(200);
                    else this_context.add.sprite(x, y,'red_pop').play('red_pop_animation').setDepth(200);

                    sprite1.snakeSection[i].destroy(); 
                }
                sprite1.setVisible(false);
                var x=sprite1.x;
                var y=sprite1.y;
                
                if (sprite1.status !='red') this_context.add.sprite(x, y,'green_pop').play('green_pop_animation').setDepth(200);
                else this_context.add.sprite(x, y,'red_pop').play('red_pop_animation').setDepth(200);

                sprite1.destroy(true);
            }
            else
            {
                sprite1.setVisible(false);
                var x=sprite1.x;
                var y=sprite1.y;
                this_context.add.sprite(x, y,'blue_pop').play('blue_pop_animation').setDepth(200);
                sprite1.destroy(true);

                var bonus = this_context.add.dynamicBitmapText(0, 0, 'bonustext', "100").setOrigin(.5).setScale(2).setCenterAlign().setPosition(x,y).setDepth(200);
                this_context.tweens.add({targets: bonus, y: y-35, alpha: 0, ease: 'Sine.easeOut', duration: 400});
            }
    },

    winger_collision: function(sprite1,sprite2)
    {
        var player_or_demobot = demo_mode==false ? player:demobot;

        if (!sprite1.busy)
        {
            sprite1.busy = true;

            var last_ssi = player_or_demobot.numSnakeSections-1;

            // // check for sploder section
            // if (player_or_demobot.snakeSection[ssi].type=='sploder')
            // {            
            //     // draw a sploder sprite under the winger
            // }
            // else
            // {

                // draw a body section sprite under the winger
                sprite1.package_sprite.visible = true;

            // }            
                
            player_or_demobot.snakeSection[last_ssi].destroy();            

            var truncateSections = 1;

            player_or_demobot.snakeSection.splice(last_ssi,last_ssi);
            player_or_demobot.numSnakeSections = player_or_demobot.numSnakeSections-truncateSections;
            player_or_demobot.snakePath.splice( player_or_demobot.numSnakeSections*player_or_demobot.snakeSpacer, truncateSections*player_or_demobot.snakeSpacer );

            if (player_or_demobot.numSnakeSections==0) this_context.player_dead = true;

            this_context.update_enemy_colors(player_or_demobot);
        }
        

        
    },




    e2pbody_collision: function(sprite1,sprite2)
    {
        var player_or_demobot = demo_mode==false ? player:demobot;

        var ssi = player_or_demobot.snakeSection.findIndex(function(e){return (e == sprite2)});

        // check for sploder section and destroy attacking enemy if true
        if (player_or_demobot.snakeSection[ssi].type=='sploder')
        {
            if (sprite1.type=='snake')
            {
                for (var i=0;i<sprite1.numSnakeSections;i++)
                {
                    sprite1.snakeSection[i].setVisible(false);
                    var x=sprite1.snakeSection[i].x;
                    var y=sprite1.snakeSection[i].y;
                    
                    if (sprite1.status !='red') this_context.add.sprite(x, y,'green_pop').play('green_pop_animation').setDepth(200);
                    else this_context.add.sprite(x, y,'red_pop').play('red_pop_animation').setDepth(200);

                    sprite1.snakeSection[i].destroy(); 
                }
                sprite1.setVisible(false);
                var x=sprite1.x;
                var y=sprite1.y;
                
                if (sprite1.status !='red') this_context.add.sprite(x, y,'green_pop').play('green_pop_animation').setDepth(200);
                else this_context.add.sprite(x, y,'red_pop').play('red_pop_animation').setDepth(200);

                sprite1.destroy(true);
            }
            else
            {

                sprite1.setVisible(false);
                var x=sprite1.x;
                var y=sprite1.y;
                this_context.add.sprite(x, y,'blue_pop').play('blue_pop_animation').setDepth(200);
                sprite1.destroy(true);

                var bonus = this_context.add.dynamicBitmapText(0, 0, 'bonustext', "100").setOrigin(.5).setScale(2).setCenterAlign().setPosition(x,y).setDepth(200);
                this_context.tweens.add({targets: bonus, y: y-35, alpha: 0, ease: 'Sine.easeOut', duration: 400});
            }
            
        }
        // end check for sploder

        for (var i=ssi;i<player_or_demobot.numSnakeSections;i++)
        {
            player_or_demobot.snakeSection[i].setVisible(false);
            var x=player_or_demobot.snakeSection[i].x;
            var y=player_or_demobot.snakeSection[i].y;

            if (player_or_demobot.snakeSection[i].type=='normal')
            {
                this_context.add.sprite(x, y,'cyan_pop').play('cyan_pop_animation').setDepth(200);
            }
            else
            {
                var new_explosion = this_context.physics.add.sprite(x, y,'purple_explosion').play('purple_explosion_animation').setDepth(200);
                this_context.physics.add.overlap(this_context.enemy_group, new_explosion, this_context.explosion_collision);
                new_explosion.on('animationcomplete', this_context.explosion_callback, this_context);
            }
            
            
            player_or_demobot.snakeSection[i].destroy();            
        }

        var truncateSections = player_or_demobot.numSnakeSections-ssi;

        player_or_demobot.snakeSection.splice(ssi,truncateSections);
        player_or_demobot.numSnakeSections = player_or_demobot.numSnakeSections-truncateSections;
        player_or_demobot.snakePath.splice( player_or_demobot.numSnakeSections*player_or_demobot.snakeSpacer, truncateSections*player_or_demobot.snakeSpacer );

        if (player_or_demobot.numSnakeSections==0) this_context.player_dead = true;

        this_context.update_enemy_colors(player_or_demobot);

        
    },     

    p2ehead_collision: function(sprite1,sprite2)
    {
        if (sprite1.numSnakeSections>sprite2.numSnakeSections)
        {
            for (var i=0;i<sprite2.numSnakeSections;i++)
            {
                sprite2.snakeSection[i].setVisible(false);
                var x=sprite2.snakeSection[i].x;
                var y=sprite2.snakeSection[i].y;
                this_context.add.sprite(x, y,'green_pop').play('green_pop_animation').setDepth(200);

                sprite2.snakeSection[i].destroy(); 
            }
            sprite2.setVisible(false);
            var x=sprite2.x;
            var y=sprite2.y;
            this_context.add.sprite(x, y,'green_pop').play('green_pop_animation').setDepth(200);

            sprite2.destroy(true);

            this_context.add_playersection(sprite1);
        }
        else
        {
            if (sprite2.type=='spider' && sprite2.status=='violet')
            {
                sprite2.setVisible(false);
                var x=sprite2.x;
                var y=sprite2.y;
                this_context.add.sprite(x, y,'blue_pop').play('blue_pop_animation').setDepth(200);
                sprite2.destroy(true);
            }
            else
            {
                for (var i=0;i<sprite1.numSnakeSections;i++)
                {
                    sprite1.snakeSection[i].setVisible(false);
                    var x=sprite1.snakeSection[i].x;
                    var y=sprite1.snakeSection[i].y;
                    this_context.add.sprite(x, y,'cyan_pop').play('cyan_pop_animation').setDepth(200);

                    sprite1.snakeSection[i].destroy(); 
                }
                sprite1.setVisible(false);
                var x=sprite1.x;
                var y=sprite1.y;
                this_context.add.sprite(x, y,'cyan_pop').play('cyan_pop_animation').setDepth(200);

                sprite1.numSnakeSections=0;

                this_context.player_dead = true;   
            }
        }
    },

    p2ebody_collision: function(sprite1,sprite2)
    {
        var ei = this_context.enemy_array.findIndex(function(e){return (e.eindex == sprite2.eindex)});
        var thisEnemy = this_context.enemy_array[ei];
        var ssi = thisEnemy.snakeSection.findIndex(function(e){return (e == sprite2)});

        for (var i=ssi;i<thisEnemy.numSnakeSections;i++)
        {
            thisEnemy.snakeSection[i].setVisible(false);
            var x=thisEnemy.snakeSection[i].x;
            var y=thisEnemy.snakeSection[i].y;
            if (thisEnemy.status !='red') this_context.add.sprite(x, y,'green_pop').play('green_pop_animation').setDepth(200);
            else this_context.add.sprite(x, y,'red_pop').play('red_pop_animation').setDepth(200);

            thisEnemy.snakeSection[i].destroy(); 
        }
        
        thisEnemy.numSnakeSections = thisEnemy.numSnakeSections-(thisEnemy.numSnakeSections-ssi);

        if (thisEnemy.numSnakeSections==0) 
        {
            thisEnemy.setVisible(false);
            var x=thisEnemy.x;
            var y=thisEnemy.y;
            if (thisEnemy.status !='red') this_context.add.sprite(x, y,'green_pop').play('green_pop_animation').setDepth(200);
            else this_context.add.sprite(x, y,'red_pop').play('red_pop_animation').setDepth(200);

            thisEnemy.destroy();
            this_context.add_playersection(sprite1);
        }
        
        this_context.update_enemy_colors(sprite1);
    },

    s2ehead_collision: function(sprite1,sprite2)
    {
        for (var i=0;i<sprite2.numSnakeSections;i++)
        {
            sprite2.snakeSection[i].setVisible(false);
            var x=sprite2.snakeSection[i].x;
            var y=sprite2.snakeSection[i].y;
            //this_context.add.sprite(x, y,'green_pop').play('green_pop_animation').setDepth(200);
            if (sprite2.status !='red') this_context.add.sprite(x, y,'green_pop').play('green_pop_animation').setDepth(200);
            else this_context.add.sprite(x, y,'red_pop').play('red_pop_animation').setDepth(200);

            sprite2.snakeSection[i].destroy(); 
        }
        sprite2.setVisible(false);
        var x=sprite2.x;
        var y=sprite2.y;
        //this_context.add.sprite(x, y,'green_pop').play('green_pop_animation').setDepth(200);
        if (sprite2.status !='red') this_context.add.sprite(x, y,'green_pop').play('green_pop_animation').setDepth(200);
        else this_context.add.sprite(x, y,'red_pop').play('red_pop_animation').setDepth(200);

        sprite2.destroy(true);

        
    },

    s2ebody_collision: function(sprite1,sprite2)
    {
        var ei = this_context.enemy_array.findIndex(function(e){return (e.eindex == sprite2.eindex)});
        var thisEnemy = this_context.enemy_array[ei];
        var ssi = thisEnemy.snakeSection.findIndex(function(e){return (e == sprite2)});

        for (var i=ssi;i<thisEnemy.numSnakeSections;i++)
        {
            thisEnemy.snakeSection[i].setVisible(false);
            var x=thisEnemy.snakeSection[i].x;
            var y=thisEnemy.snakeSection[i].y;
            if (thisEnemy.status !='red') this_context.add.sprite(x, y,'green_pop').play('green_pop_animation').setDepth(200);
            else this_context.add.sprite(x, y,'red_pop').play('red_pop_animation').setDepth(200);

            thisEnemy.snakeSection[i].destroy(); 
        }
        
        thisEnemy.numSnakeSections = thisEnemy.numSnakeSections-(thisEnemy.numSnakeSections-ssi);

        if (thisEnemy.numSnakeSections==0) 
        {
            thisEnemy.setVisible(false);
            var x=thisEnemy.x;
            var y=thisEnemy.y;
            if (thisEnemy.status !='red') this_context.add.sprite(x, y,'green_pop').play('green_pop_animation').setDepth(200);
            else this_context.add.sprite(x, y,'red_pop').play('red_pop_animation').setDepth(200);

            thisEnemy.destroy();
            
        }
        
        if (demo_mode) this_context.update_enemy_colors(demobot);
        else this_context.update_enemy_colors(player);

    },

    do_skiller: function(sprite1, sprite2)
    {
        for (var y=0;y<this_context.enemy_array.length;y++)
        {
            if (this_context.enemy_array[y].type == 'spider') 
            { 
                this_context.enemy_array[y].setTexture('spider_violet');
                this_context.enemy_array[y].status = 'violet';
            }

        }
    },

    do_sploder: function(sprite1, sprite2)
    {
        sprite1.numSnakeSections++;

        //re-init sprite snakePath array
        for (var i = (sprite1.numSnakeSections) * sprite1.snakeSpacer; i < (sprite1.numSnakeSections+1) * sprite1.snakeSpacer; i++)
        {
            sprite1.snakePath[i] = {x:0, y:0, angle:0};
        }

        var thisSection = this_context.physics.add.sprite(-100, -100, 'sploder').setDepth(100-sprite1.numSnakeSections).play('sploder_animation');

        thisSection.type = 'sploder';

        sprite1.snakeSection.push(thisSection);         

        this_context.update_enemy_colors(sprite1);

        sprite2.destroy();
    },

    do_spideregg: function(sprite1,sprite2)
    {
        sprite2.visible=false;

        var spawnsprite = this_context.add.sprite( sprite2.x, sprite2.y ,'atest3').play('atest3_animation').setDepth(200);
        spawnsprite.on('animationcomplete', this_context.initSpider, this_context);

        // this_context.newspiderX = sprite2.x;
        // this_context.newspiderY = sprite2.y;
        // this_context.spawnanimation = spawnanimation;
        
        sprite2.destroy();

        // enemy.type = 'spider';
        // enemy.speed = Phaser.Math.RND.realInRange(1.2, 2.2);
        // enemy.emarker = {};
        // enemy.turnPoint = {};
        // enemy.directions = [ null, null, null, null, null ];
        // enemy.current = _DOWN;
        // enemy.turning = _NONE;
        // enemy.AI_turnTo = _NONE;
        // enemy.saved_emarker = {x:1,y:8};
        // enemy.safe_tile_list = [];
        // enemy.newFlag = false;

        //this.enemy_group.add(enemy);
    },

    initSpider: function(anim,frame,spawnsprite)
    {
        var enemy = this.physics.add.sprite(spawnsprite.x, spawnsprite.y, 'spider').setDepth(100).setAngle(90);
        spawnsprite.destroy();

        enemy.type = 'spider';
        enemy.status = 'blue';
        enemy.speed = Phaser.Math.RND.realInRange(1.2, 2.2);
        enemy.emarker = {};
        enemy.turnPoint = {};
        enemy.directions = [ null, null, null, null, null ];
        enemy.current = _DOWN;
        enemy.turning = _NONE;
        enemy.AI_turnTo = _NONE;
        enemy.saved_emarker = {x:1,y:8};
        enemy.safe_tile_list = [];
        enemy.newFlag = false;

        // init spider collisions to enemy snakes
        for (var y=0;y<this.enemy_array.length;y++)
        {
            if (this.enemy_array[y].type == 'snake') 
                { 
                    this.physics.add.overlap(enemy, this.enemy_array[y], this.s2ehead_collision);
                    this.physics.add.overlap(enemy, this.enemy_array[y].snakeSection, this.s2ebody_collision); 
                }
        }

        if (!demo_mode)
        {
            this.enemy_group.add(enemy);
        }
        else
        {
            this.enemy_group.add(enemy);
            this.demo_group.add(enemy);
        }
    },

    do_bf: function(sprite1,sprite2)
    {
        myCam.zoomTo(sprite2.zoomTo);
    },

    do_mush: function(sprite1,sprite2)
    {
        if (sprite1.saved_marker.x !== sprite1.marker.x || sprite1.saved_marker.y !== sprite1.marker.y)
        {
            sprite1.saved_marker.x = sprite1.marker.x;
            sprite1.saved_marker.y = sprite1.marker.y;

            ///prevents false trigger when leaving tile
            var mush_on_tile = this_context.map.getTileAt(sprite2.marker.x, sprite2.marker.y);

            if (mush_on_tile !== sprite1.directions[1] && mush_on_tile !== sprite1.directions[2] && mush_on_tile !== sprite1.directions[3] && mush_on_tile !== sprite1.directions[4])
            {
                sprite1.sametile = false;
            }
        }
        else
        {
            sprite1.sametile = true;
        }  

        if (!sprite1.sametile)
        {
            if (sprite2.newmaze)
            {
                this_context.displayMaze(this_context.generateMaze(this_context.mazeWidth,this_context.mazeHeight), sprite2.gapfactor);
            }
            else
            {
                this_context.displayMaze(this_context.mainMaze, sprite2.gapfactor);
            }

            this_context.time.addEvent({ delay: 0, callback: this_context.wave, callbackScope: this_context, repeat: 10 });
            this_context.time.addEvent({ delay: 0, callback: this_context.noise, callbackScope: this_context, repeat: 10 });
            this_context.time.addEvent({ delay: 200, callback: this_context.resetmazeimage, callbackScope: this_context, repeat: 0 });
        }
    },

    resetmazeimage: function()
    {

        thing = this.mazeTilesetImage;

        // reset context to original, unaltered image data
        thing.context.clearRect(0,0,thing.buffer.width,thing.buffer.height);
        thing.context.drawImage(thing.srcimg, 0,0,thing.srcimg.width,thing.srcimg.height,0,0,thing.buffer.width, thing.buffer.height);
        thing.buffer.refresh();
    },
    
    update: function(time)
    {
        // player, demobot, enemies

        if (!this.player_dead)
        {
            if (!demo_mode)
            {
                this.player_movement();
            
                // enemy ai movement
                for (var e=0; e<this.enemy_array.length;e++)
                {
                    this.enemy_ai_movement(this.enemy_array[e]);
                }
            }
                
            else
            {
                // demo ai movement
                for (var e=0; e<this.demo_array.length;e++)
                {
                    this.enemy_ai_movement(this.demo_array[e]);
                }
            }
        }
        else
        {
            this.newPlay();
        }



            
        // animated sprites

        this.animated_group.children.iterate( 

            function(_sprite)
            { 
                _sprite.move() 
            } 

        );
                

    },


    newPlay: function()
    {

        this.scene.restart();
    },

    wave: function()
    {

        var thing = this.mazeTilesetImage;

        // reset context to original, unaltered image data
        thing.context.clearRect(0,0,thing.buffer.width,thing.buffer.height);
        thing.context.drawImage(thing.srcimg, 0,0,thing.srcimg.width,thing.srcimg.height,0,0,thing.buffer.width, thing.buffer.height);
       


        numberOfFrames = thing.buffer.width;
        wavePixelChunk = 1;
        
        // retrieve the unaltered image data and pixels                 
        var imageData = thing.context.getImageData(0, 0, thing.buffer.width, thing.buffer.height);
        var savedpixels = imageData.data;

        // width is number of frames, 1 frame for every col
        for (var x = 0; x <numberOfFrames ; x += wavePixelChunk)
        {
            
                
            
                

            var y = thing.waveData.sin[x];

            for (var sy=0; sy<thing.buffer.height; sy++)  
            {   
                var bytesPerPixel=4; 

                var sourceIndex=(bytesPerPixel*x) + (thing.buffer.width*bytesPerPixel)*sy;

                var red=savedpixels[sourceIndex];
                var green=savedpixels[sourceIndex+1];
                var blue=savedpixels[sourceIndex+2];
                var alpha=savedpixels[sourceIndex+3];

                var yadj = Math.round(y)+sy;
                var targetIndex= (bytesPerPixel*x) + (thing.buffer.width*bytesPerPixel)*yadj;

                thing.pixels[targetIndex]=red; 
                thing.pixels[targetIndex+1]=green;   
                thing.pixels[targetIndex+2]=blue;   
                thing.pixels[targetIndex+3]=alpha;         
            }                     
        }
            
        //  Cycle through the wave data - this is what causes the image to "undulate"
        Phaser.Utils.Array.RotateRight(thing.waveData.sin);
    
        // this.waveFrameIndex+=this.wavePixelChunk;
    
        // if (this.waveFrameIndex>=this.numberOfFrames) 
        // {
        //     this.waveFrameIndex = 0; 
        //     this.scrollcycles++;
        //     if (this.scrollcycles==1) { this.scrollcycles=0 } //this.wallAnimatedData.modedoneflag='true';
            
        // }


        thing.buffer.getContext('2d', {willReadFrequently:true}).putImageData(thing.imagedata,0,0);
            thing.buffer.refresh();
    },

    noise: function()
    {
        var thing = this.mazeTilesetImage;
        
        var colors = ['blue','red','orange','green','cyan','violet'];
        var color = colors[Phaser.Math.Between(0,colors.length-1)];

        var r,g,b;

        if (color=='red') { r=255; g=0; b=0; }
        if (color=='green') { r=0; g=255; b=0; }
        if (color=='blue') { r=0; g=0; b=255; }
        if (color=='orange') { r=255; g=255; b=0; }
        if (color=='cyan') { r=0; g=255; b=255; }
        if (color=='violet') { r=255; g=0; b=255; }
        if (color=='white') { r=255; g=255; b=255; }
        if (color=='black') { r=0; g=0; b=0; }

        //copy pixels
        for (var x=0; x<thing.buffer.width; x++)
        {            
            for (var y=0; y<thing.buffer.height; y++)
            {
                var bytesPerPixel=4;
                var targetIndex=(thing.buffer.width*bytesPerPixel)*y+(bytesPerPixel*x);          
                // var red = this.wall[i].pixels[targetIndex];
                // var green = this.wall[i].pixels[targetIndex+1];
                // var blue = this.wall[i].pixels[targetIndex+2];
                var alpha = thing.pixels[targetIndex+3];
            
                if (alpha!=0)
                {
                    var greylev = Phaser.Math.Between(80,160);
                    thing.pixels[targetIndex]=greylev*r/255;
                    thing.pixels[targetIndex+1]=greylev*g/255;
                    thing.pixels[targetIndex+2]=greylev*b/255;
                }                
            }            
        }

        thing.buffer.getContext('2d', {willReadFrequently:true}).putImageData(thing.imagedata,0,0);
            thing.buffer.refresh();
    },



    player_movement: function()
    {
             
        // Rounds down to nearest tile
        player.marker.x = this.map.worldToTileX(player.x);
        player.marker.y = this.map.worldToTileY(player.y);        
        
        //  Update our grid sensors
        player.directions[1] = this.map.getTileAt(player.marker.x-1, player.marker.y);
        player.directions[2] = this.map.getTileAt(player.marker.x+1, player.marker.y);
        player.directions[3] = this.map.getTileAt(player.marker.x, player.marker.y-1);
        player.directions[4] = this.map.getTileAt(player.marker.x, player.marker.y+1);
        
        this.checkKeys();

        if (this.turning !== _NONE)
        {
            this.turn();
        }

        var path_part = player.snakePath[0];

        
        if ( !(path_part.x==player.x && path_part.y==player.y) ) //keeps snake from bunching on wall collision
        {
            path_part = player.snakePath.pop();

            path_part.x = player.x;
            path_part.y = player.y;
            path_part.angle = player.angle;

            player.snakePath.unshift(path_part);

            for (var i = 0; i < player.numSnakeSections; i++)
            {
                

                player.snakeSection[i].x = (player.snakePath[(i+1) * player.snakeSpacer]).x;
                player.snakeSection[i].y = (player.snakePath[(i+1) * player.snakeSpacer]).y;
                player.snakeSection[i].angle = (player.snakePath[(i+1) * player.snakeSpacer]).angle;
            }   
        }

        //advance movement manually
        switch (this.current)
            {
                case 1:
                        if (player.directions[1].index == 1)
                        {
                            player.body.x -= player.speed;
                        }
                        else
                        {
                            if (player.body.x>player.directions[1].pixelX+16)
                            {
                                player.body.x -= player.speed;
                            }

                            //// if needed to reset body from wall
                            // else
                            // {
                            //     player.body.x=player.directions[1].pixelX+16;
                            // }
                            
                        }
                        
                        break;
                case 2:
                        if (player.directions[2].index == 1)
                        {
                            player.body.x += player.speed;
                        }
                        else
                        {
                            if (player.body.x<player.directions[2].pixelX-16)
                            {
                                player.body.x += player.speed;
                            }
                            //// if needed to reset body from wall
                            // else
                            // {
                            //     player.body.x=player.directions[2].pixelX-16;
                            // }
                            
                        }
                                                
                        break;
                case 3:
                        if (player.directions[3].index == 1)
                        {
                            player.body.y -= player.speed;
                        }
                        else
                        {
                            if (player.body.y>player.directions[3].pixelY+16)
                            {
                                player.body.y -= player.speed;
                            }
                            // if needed to reset body from wall
                            // else
                            // {
                            //     player.body.y=player.directions[3].pixelY+16;
                            // }
                            
                        }
                        
                        break;
                case 4:
                        if (player.directions[4].index == 1)
                        {
                            player.body.y += player.speed;
                        }
                        else
                        {
                            if (player.body.y<player.directions[4].pixelY-16)
                            {
                                player.body.y += player.speed;
                            }
                            // if needed to reset body from wall
                            // else
                            // {
                            //     player.body.y=player.directions[4].pixelY-16;
                            // }
                            
                        }
                        
                        break;
            }


    },
    

    enemy_ai_movement: function (enemy) {
    // enemy ai movement

        if (enemy==demobot)
        {
            demobot.marker.x = this.map.worldToTileX(demobot.x);
            demobot.marker.y = this.map.worldToTileY(demobot.y);
        }

        // Rounds down to nearest tile
        enemy.emarker.x = this.map.worldToTileX(enemy.x);
        enemy.emarker.y = this.map.worldToTileY(enemy.y);

        //  Update our grid sensors
        enemy.directions[1] = this.map.getTileAt(enemy.emarker.x-1, enemy.emarker.y);
        enemy.directions[2] = this.map.getTileAt(enemy.emarker.x+1, enemy.emarker.y);
        enemy.directions[3] = this.map.getTileAt(enemy.emarker.x, enemy.emarker.y-1);
        enemy.directions[4] = this.map.getTileAt(enemy.emarker.x, enemy.emarker.y+1);



        //this.tile_change_text.setText( enemy.emarker.x + "   " + enemy.emarker.y);

        if ( (enemy.emarker.x !== enemy.saved_emarker.x) || (enemy.emarker.y !== enemy.saved_emarker.y) ) 

        {
            
            


            enemy.saved_emarker.x = enemy.emarker.x; 
            enemy.saved_emarker.y = enemy.emarker.y;

            //console.log('check');
            
            enemy.newFlag = true;

            //this.stile_change_text.setText( enemy.saved_emarker.x + "   " + enemy.saved_emarker.y);

            
            
            enemy.saved_timecheck = game.loop.now
            
            
        }


        else
        {
            

            if (enemy.newFlag == true) 
                {this.checkAI(enemy);}
            else
            {
                if (game.loop.now > enemy.saved_timecheck + 500)
                {      
                    //enemy stuck after maze change   
                    enemy.newFlag = true;
                    //console.log('stuck');
                }
            }

        }
        
        

        if (enemy.AI_turnTo==1 && enemy.current !== _LEFT)
        {
            this.echeckDirection(_LEFT, enemy);
            this.eturn(enemy);
        }
        else if (enemy.AI_turnTo==2 && enemy.current !== _RIGHT)
        {
            this.echeckDirection(_RIGHT, enemy);
            this.eturn(enemy);
        }
        else if (enemy.AI_turnTo==3 && enemy.current !== _UP)
        {
            this.echeckDirection(_UP, enemy);
            this.eturn(enemy);
        }
        else if (enemy.AI_turnTo==4 && enemy.current !== _DOWN)
        {
            this.echeckDirection(_DOWN, enemy);
            this.eturn(enemy);
        }



        

        


        
        //advance movement manually
        var move_offset = enemy.type=='snake' ? 16:0;
        switch (enemy.current)
            {
                case 1:
                        if (enemy.directions[1].index == 1)
                        {
                            enemy.body.x -= enemy.speed;
                        }
                        else
                        {
                            if (enemy.body.x>enemy.directions[1].pixelX+move_offset)
                            {
                                enemy.body.x -= enemy.speed;
                            }

                            // if needed to reset body from wall
                            else
                            {   
                                enemy.body.x=enemy.directions[1].pixelX+move_offset;
                                //else enemy.current = this.opposites[enemy.current];               
                                
                            }
                            
                        }
                        
                        break;
                case 2:
                        if (enemy.directions[2].index == 1)
                        {
                            enemy.body.x += enemy.speed;
                        }
                        else
                        {
                            if (enemy.body.x<enemy.directions[2].pixelX-move_offset)
                            {
                                enemy.body.x += enemy.speed;
                            }
                            // if needed to reset body from wall
                            else
                            {
                                enemy.body.x=enemy.directions[2].pixelX-move_offset;
                                //else enemy.current = this.opposites[enemy.current]; 
                            }
                            
                        }
                                                
                        break;
                case 3:
                        if (enemy.directions[3].index == 1)
                        {
                            enemy.body.y -= enemy.speed;
                        }
                        else
                        {
                            if (enemy.body.y>enemy.directions[3].pixelY+move_offset)
                            {
                                enemy.body.y -= enemy.speed;
                            }
                            // if needed to reset body from wall
                            else
                            {
                                enemy.body.y=enemy.directions[3].pixelY+move_offset;
                                //else enemy.current = this.opposites[enemy.current]; 
                            }
                            
                        }
                        
                        break;
                case 4:
                        if (enemy.directions[4].index == 1)
                        {
                            enemy.body.y += enemy.speed;
                        }
                        else
                        {
                            if (enemy.body.y<enemy.directions[4].pixelY-move_offset)
                            {
                                enemy.body.y += enemy.speed;
                            }
                            // if needed to reset body from wall
                            else
                            {
                                enemy.body.y=enemy.directions[4].pixelY-move_offset;
                                //else enemy.current = this.opposites[enemy.current]; 
                            }
                            
                        }
                        
                        break;
            }

        
        if (enemy.type == 'snake')
        {
            var epart = enemy.snakePath[0];
        
            if ( !(epart.x==enemy.x && epart.y==enemy.y) )
            {
                epart = enemy.snakePath.pop();

                epart.x = enemy.x;
                epart.y = enemy.y;
                epart.angle = enemy.angle;



                enemy.snakePath.unshift(epart);

                for (var i = 1; i <= enemy.numSnakeSections; i++)
                {
                    enemy.snakeSection[i-1].x = (enemy.snakePath[i * enemy.snakeSpacer]).x;
                    enemy.snakeSection[i-1].y = (enemy.snakePath[i * enemy.snakeSpacer]).y;
                    enemy.snakeSection[i-1].angle = (enemy.snakePath[i * enemy.snakeSpacer]).angle;
                }   
            }
        }
        


    },
    checkAI: function (enemy) {
        
        
        
        
            
        enemy.newFlag = false;
            

        
            enemy.safe_tile_list = [];

            for (var z=1;z<5;z++)
            {
                if (z !== this.opposites[enemy.current])
                {
                    if (enemy.directions[z].index==this.safetile) {enemy.safe_tile_list.push(z)}
                }
                
            }

            //console.log(this.safe_tile_list);

            switch (enemy.safe_tile_list.length)
            {
                case 0:

                    enemy.AI_turnTo = this.opposites[enemy.current];
                    break;

                case 1:
                    enemy.AI_turnTo = enemy.safe_tile_list[0];
                    break;

                case 2:
                    enemy.AI_turnTo = enemy.safe_tile_list[Phaser.Math.Between(0, enemy.safe_tile_list.length-1)];
                    //this.AI_turnTo = safe_tile_list[0];
                    //if (this.AI_turnTo == this.opposites[this.current]) {this.AI_turnTo = safe_tile_list[1]}
                    break;

                case 3:
                    enemy.AI_turnTo = enemy.safe_tile_list[Phaser.Math.Between(0, enemy.safe_tile_list.length-1)];
                    //this.AI_turnTo = safe_tile_list[1];
                    //if (this.AI_turnTo == this.opposites[this.current]) {this.AI_turnTo = safe_tile_list[2]}
                    break;

                case 4:
                    enemy.AI_turnTo = enemy.safe_tile_list[Phaser.Math.Between(0, enemy.safe_tile_list.length-1)];
                    //this.AI_turnTo = safe_tile_list[2];
                    //if (this.AI_turnTo == this.opposites[this.current]) {this.AI_turnTo = safe_tile_list[3]}
                    break;
            }

            
            
            //console.log(this.AI_turnTo);

        // if (enemy.AI_turnTo==1) {left_text.setColor('#00ff00')} else {left_text.setColor('#ff0000')}
        // if (enemy.AI_turnTo==2) {right_text.setColor('#00ff00')} else {right_text.setColor('#ff0000')}
        // if (enemy.AI_turnTo==3) {up_text.setColor('#00ff00')} else {up_text.setColor('#ff0000')}
        // if (enemy.AI_turnTo==4) {down_text.setColor('#00ff00')} else {down_text.setColor('#ff0000')}

        

        
                
        // current_text.setText('current direction: ' + dir_text_label[enemy.current]);
        // turning_text.setText('current turn setting:' + dir_text_label[enemy.turning]);
            

                
        

    },

    checkKeys: function () {

        if (Phaser.Input.Keyboard.JustDown(this.up_key))
        {
            this.last_direction_pressed = _UP;
        }
        if (Phaser.Input.Keyboard.JustDown(this.down_key))
        {
            this.last_direction_pressed = _DOWN;
        }
        if (Phaser.Input.Keyboard.JustDown(this.left_key))
        {
            this.last_direction_pressed = _LEFT;
        }
        if (Phaser.Input.Keyboard.JustDown(this.right_key))
        {
            this.last_direction_pressed = _RIGHT;
        }

        

        if (touchActivated)

        {
            if ( guiLeft && this.current !== _LEFT )
            {
                this.checkDirection(_LEFT);
            }
            else if ( guiRight && this.current !== _RIGHT)
            {
                this.checkDirection(_RIGHT);
            }
            else if ( guiUp && this.current !== _UP)
            {
                this.checkDirection(_UP);
            }
            else if ( guiDown && this.current !== _DOWN)
            {
                this.checkDirection(_DOWN);
            }
            else
            {
                //  This forces them to hold the key down to turn the corner
                this.turning = _NONE;

            }
        }

        
        else if (gamepad)

        {
            if ( (gamepad.left && this.last_direction_pressed==_LEFT) && this.current !== _LEFT)
            {
                this.checkDirection(_LEFT);
            }
            else if ( (gamepad.right && this.last_direction_pressed==_RIGHT) && this.current !== _RIGHT)
            {
                this.checkDirection(_RIGHT);
            }
            else if ( (gamepad.up && this.last_direction_pressed==_UP) && this.current !== _UP)
            {
                this.checkDirection(_UP);
            }
            else if ( (gamepad.down && this.last_direction_pressed==_DOWN) && this.current !== _DOWN)
            {
                this.checkDirection(_DOWN);
            }
            else
            {
                //  This forces them to hold the key down to turn the corner
                this.turning = _NONE;

            }
        }

        else

        {
            if ( (cursors.left.isDown && this.last_direction_pressed==_LEFT) && this.current !== _LEFT )
            {
                this.checkDirection(_LEFT);
            }
            else if ( (cursors.right.isDown && this.last_direction_pressed==_RIGHT) && this.current !== _RIGHT)
            {
                this.checkDirection(_RIGHT);
            }
            else if ( (cursors.up.isDown && this.last_direction_pressed==_UP) && this.current !== _UP)
            {
                this.checkDirection(_UP);
            }
            else if ( (cursors.down.isDown && this.last_direction_pressed==_DOWN) && this.current !== _DOWN)
            {
                this.checkDirection(_DOWN);
            }
            else
            {
                //  This forces them to hold the key down to turn the corner
                this.turning = _NONE;

            }
        }
    },
    

    checkDirection: function (turnTo) {

        if (player.directions[turnTo] === null || player.directions[turnTo].index !== this.safetile)
        {
            //  Invalid direction if there is no tile there, or the tile doesn't index a floor tile

            return;
        }

        //  Check if they want to turn around and can
        if (this.current === this.opposites[turnTo])
        {
            this.move(turnTo);
        }
        else
        {
            this.turning = turnTo;

            this.turnPoint.x = (player.marker.x * this.gridsize) + (this.gridsize / 2);
            this.turnPoint.y = (player.marker.y * this.gridsize) + (this.gridsize / 2);
        }
    },

    turn: function () {

        var cx = Math.floor(player.x);
        var cy = Math.floor(player.y);

        //  This needs a threshold, because at high speeds you can't turn because the coordinates skip past
        if (!Phaser.Math.Fuzzy.Equal(cx, this.turnPoint.x, this.threshold) || !Phaser.Math.Fuzzy.Equal(cy, this.turnPoint.y, this.threshold))
        {
            return false;
        }

        player.x = this.turnPoint.x;
        player.y = this.turnPoint.y;

        player.body.reset(this.turnPoint.x, this.turnPoint.y);

        this.move(this.turning);

        //this.turning = _NONE;

        return true;

    },

    move: function (direction) {

        //var speed = this.speed;

        if (direction === _LEFT)
        {
            //player.body.velocity.x = -speed;

            if (this.current === _UP)
            {
                this.tweens.add({targets: player,angle: -180,duration: 150,});
            }
            else
            {
                this.tweens.add({targets: player,angle: 180,duration: 150,});
            }
            
            //player.angle = 180;
        }
        if (direction === _RIGHT)
        {
            //player.body.velocity.x = speed;
            this.tweens.add({targets: player,angle: 0,duration: 150,});
            //player.angle = 0;
        }
        if (direction === _UP)
        {
            //player.body.velocity.y = -speed;
            this.tweens.add({targets: player,angle: -90,duration: 150,});
            //player.angle = -90;
        }
        if (direction === _DOWN)
        {


            //player.body.velocity.y = speed;
            if (this.current === _LEFT)
            {
                this.tweens.add({targets: player,angle: -270,duration: 150,});
            }
            else
            {
                this.tweens.add({targets: player,angle: 90,duration: 150,});
            }

            //player.angle = 90;
        }   

        this.current = direction;

    },

    echeckDirection: function (turnTo, enemy) {

        if (enemy.directions[turnTo] === null || enemy.directions[turnTo].index !== this.safetile)
        {
            //  Invalid direction if there is no tile there, or the tile doesn't index a floor tile

            return;
        }

        //  Check if they want to turn around and can
        if (enemy.current === this.opposites[turnTo])
        {
            this.emove(turnTo, enemy);
        }
        else
        {
            enemy.turning = turnTo;
            

            enemy.turnPoint.x = (enemy.emarker.x * this.gridsize) + (this.gridsize / 2);
            enemy.turnPoint.y = (enemy.emarker.y * this.gridsize) + (this.gridsize / 2);
        }
    },

    eturn: function (enemy) {

        var cx = Math.floor(enemy.x);
        var cy = Math.floor(enemy.y);

        //  This needs a threshold, because at high speeds you can't turn because the coordinates skip past
        if (!Phaser.Math.Fuzzy.Equal(cx, enemy.turnPoint.x, this.threshold) || !Phaser.Math.Fuzzy.Equal(cy, enemy.turnPoint.y, this.threshold))
        {

            return false;
        }

        enemy.x = enemy.turnPoint.x;
        enemy.y = enemy.turnPoint.y;

        enemy.body.reset(enemy.turnPoint.x, enemy.turnPoint.y);

        //console.log('eturn: '+ this.turning);
        
        this.emove(enemy.turning, enemy);
        

        //this.turning = _NONE;

        return true;

    },

    // emove: function (direction) {

    //     var speed = this.speed;

    //     if (direction === _LEFT)
    //     {
    //         enemy.body.velocity.x = -speed;            
    //     }
    //     if (direction === _RIGHT)
    //     {
    //         enemy.body.velocity.x = speed;            
    //     }
    //     if (direction === _UP)
    //     {
    //         enemy.body.velocity.y = -speed;            
    //     }
    //     if (direction === _DOWN)
    //     {
    //         enemy.body.velocity.y = speed;
    //     }   

    //     //console.log('emove: '+direction);
    //     //this.eprevious = this.current;
    //     this.current = direction;

        
        
        

    // },
    emove: function (direction, enemy) {

        //var speed = this.speed;

        if (direction === _LEFT)
        {
            //player.body.velocity.x = -speed;

            if (enemy.current === _UP)
            {
                this.tweens.add({targets: enemy,angle: -180,duration: 150,});
            }
            else
            {
                this.tweens.add({targets: enemy,angle: 180,duration: 150,});
            }
            
            //player.angle = 180;
        }
        if (direction === _RIGHT)
        {
            //player.body.velocity.x = speed;
            this.tweens.add({targets: enemy,angle: 0,duration: 150,});
            //player.angle = 0;
        }
        if (direction === _UP)
        {
            //player.body.velocity.y = -speed;
            this.tweens.add({targets: enemy,angle: -90,duration: 150,});
            //player.angle = -90;
        }
        if (direction === _DOWN)
        {


            //player.body.velocity.y = speed;
            if (enemy.current === _LEFT)
            {
                this.tweens.add({targets: enemy,angle: -270,duration: 150,});
            }
            else
            {
                this.tweens.add({targets: enemy,angle: 90,duration: 150,});
            }

            //player.angle = 90;
        }   

        enemy.current = direction;

    },

    add_playersection: function(sprite) 
    {
        sprite.numSnakeSections++;

        //re-init sprite snakePath array
        for (var i = (sprite.numSnakeSections) * sprite.snakeSpacer; i < (sprite.numSnakeSections+1) * sprite.snakeSpacer; i++)
        {
            sprite.snakePath[i] = {x:0, y:0, angle:0};
        }

        var thisSection = this.physics.add.sprite(-100, -100, 'cyan_section').setDepth(100-sprite.numSnakeSections);

        thisSection.type = 'normal';

        sprite.snakeSection.push(thisSection);         

        this.update_enemy_colors(sprite);
    },

    update_enemy_colors: function(vssprite) 
    {
        for (var t=0;t<this.enemy_array.length;t++)
        {
            if (this.enemy_array[t].type=='snake')
            {
                if (this.enemy_array[t].numSnakeSections<vssprite.numSnakeSections)
                {   
                    this.enemy_array[t].status = 'green';

                    this.enemy_array[t].setTexture('green_head');
                    for (var y=0;y<this.enemy_array[t].numSnakeSections;y++)
                    {
                        this.enemy_array[t].snakeSection[y].setTexture('green_section'); 
                    }
                }
                
                else
                {
                    this.enemy_array[t].status = 'red';

                    this.enemy_array[t].setTexture('red_head');
                    for (var y=0;y<this.enemy_array[t].numSnakeSections;y++)
                    {
                        this.enemy_array[t].snakeSection[y].setTexture('red_section'); 
                    }
                }
            } 
        }
    },

    

    generateMaze: function(x,y) 
    {
        var n=x*y-1;
        if (n<0) {alert("illegal maze dimensions");return;}
        var horiz =[]; for (var j= 0; j<x+1; j++) horiz[j]= [],
            verti =[]; for (var j= 0; j<x+1; j++) verti[j]= [],
            here = [Math.floor(Math.random()*x), Math.floor(Math.random()*y)],
            path = [here],
            unvisited = [];
        for (var j = 0; j<x+2; j++) {
            unvisited[j] = [];
            for (var k= 0; k<y+1; k++)
                unvisited[j].push(j>0 && j<x+1 && k>0 && (j != here[0]+1 || k != here[1]+1));
        }
      //console.log(unvisited);
        while (0<n) {
            var potential = [[here[0]+1, here[1]], [here[0],here[1]+1],
                [here[0]-1, here[1]], [here[0],here[1]-1]];
            var neighbors = [];
            for (var j = 0; j < 4; j++)
                if (unvisited[potential[j][0]+1][potential[j][1]+1])
                    neighbors.push(potential[j]);
            if (neighbors.length) {
                n = n-1;
                next= neighbors[Math.floor(Math.random()*neighbors.length)];
          //console.log(next);
                unvisited[next[0]+1][next[1]+1]= false;
                if (next[0] == here[0])
            {
              //console.log(next[0],(next[1]+here[1]-1)/2);
              //console.log(horiz);
                      horiz[next[0]][(next[1]+here[1]-1)/2]= true;
            }
                else 
            {
              //console.log((next[0]+here[0]-1)/2,next[1]);
              //console.log(verti);
              //if ((next[0]+here[0]-1)/2 < verti.length)
                      verti[(next[0]+here[0]-1)/2][next[1]]= true;
            }
                path.push(here = next);
          //console.log(path);
            } else 
                {
            here = path.pop();
            //console.log(here);
          }
        }

      
        return {x: x, y: y, horiz: horiz, verti: verti};
    },
     
    displayMaze: function(m, gap_factor) 
    {
        // debug stuff ------
        myString1 = m.x.toString();
        myString2 = m.y.toString();

        myString3 = m.horiz.length.toString();
        myString4 = m.verti.length.toString();

        // console.log("horiz:");
        // for (i=0; i<m.horiz.length; i++)
        //     {console.log(m.horiz[i])}

        // console.log("verti:");
        // for (i=0; i<m.verti.length; i++)
        //     {console.log(m.verti[i])}
        // -------------------


        // loop through horiz and verti arrays to find wall openings for each maze cell
        // for display, the walls are oriented on the bottom/right sides of the tile square

        for (var j= 0; j<2*m.x+1; j++) 
        {this.map.putTileAt(0, j, 0); this.map.putTileAt(0, j, 2*m.y);}  
        for (var k=0; k<2*m.y+1; k++) 
        {this.map.putTileAt(0, 0, k); this.map.putTileAt(0, 2*m.x, k);}

        for (var j= 0; j<m.x+1; j++) 
        {       
            for (var k=0; k<m.y+1; k++) 
            {
          //if (m.horiz[j] != undefined && m.verti[j] != undefined)
          //{



                if ( !m.horiz[j][k] && m.verti[j][k] )
                {   
                    // only verti is true, so place horizontal line tile
                    this.map.putTileAt(1, j*2+1, k*2+1);
                    this.map.putTileAt(1, j*2+2, k*2+1);
                    if (Math.random()>gap_factor) this.map.putTileAt(0, j*2+1, k*2+2); else if (j<m.x && k<m.y-1) this.map.putTileAt(1, j*2+1, k*2+2);
                    this.map.putTileAt(0, j*2+2, k*2+2);
                }
                else if ( m.horiz[j][k] && !m.verti[j][k] )
                {
                    // only horiz is true, so place vertical line tile
                    this.map.putTileAt(1, j*2+1, k*2+1);
                    this.map.putTileAt(1, j*2+1, k*2+2);
                    if (Math.random()>gap_factor) this.map.putTileAt(0, j*2+2, k*2+1); else if (j<m.x-1 && k<m.y)  this.map.putTileAt(1, j*2+2, k*2+1);
                    this.map.putTileAt(0, j*2+2, k*2+2);
                }
                else if ( !m.horiz[j][k] && !m.verti[j][k] && (j<m.x && k<m.y) )
                {
                    // both are false, so place horizontal/vertical line tile
                    this.map.putTileAt(1, j*2+1, k*2+1);
                    if (Math.random()>gap_factor) this.map.putTileAt(0, j*2+2, k*2+1); else if (j<m.x-1 && k<m.y) this.map.putTileAt(1, j*2+2, k*2+1); 
                    if (Math.random()>gap_factor) this.map.putTileAt(0, j*2+1, k*2+2); else if (j<m.x && k<m.y-1) this.map.putTileAt(1, j*2+1, k*2+2);
                    this.map.putTileAt(0, j*2+2, k*2+2);

                }
                else if ( !m.horiz[j][k] && !m.verti[j][k] )
                {
                    // both are false outside the maze boundary
                    //this.map.putTile(1, j*2+1, k*2+1);
                    //this.map.putTile(1, j*2+2, k*2+2);
                }                       
                else
                {
                    // both are true, so place empty tile (with corner filled for looks)
                    this.map.putTileAt(1, j*2+1, k*2+1);
                    this.map.putTileAt(1, j*2+1, k*2+2);
                    this.map.putTileAt(1, j*2+2, k*2+1);
                    this.map.putTileAt(0, j*2+2, k*2+2);
              
                }

          //}

            }
        }

        ///tilethis.map scan & replace generic block tiles with maze defined art tiles
        for (var tx=0; tx<this.map.width; tx++)
        {
            for (var ty=0; ty<this.map.height; ty++) 
            {
                //console.log(tx,ty);
                if (this.map.getTileAt(tx, ty, true).index != 1)
                {
                    //console.log(tx,ty, this.map.getTileAt(tx, ty));

                    var tile_left = this.map.getTileAt(tx-1, ty);
                    var tile_right = this.map.getTileAt(tx+1, ty);
                    var tile_above = this.map.getTileAt(tx, ty-1);
                    var tile_below = this.map.getTileAt(tx, ty+1);

                    //console.log(tile_left,tile_right,tile_above,tile_below);

                    var empty_left = (tile_left == null || tile_left.index == 1);
                    var empty_right = (tile_right == null || tile_right.index == 1);
                    var empty_above = (tile_above == null || tile_above.index == 1);
                    var empty_below = (tile_below == null || tile_below.index == 1);

                    //console.log(empty_left,empty_right,empty_above,empty_below);

                    //////
                    if (empty_above && empty_below && !empty_right && !empty_left)
                    {
                        //middle horiz
                         this.map.putTileAt(2, tx, ty);
                    }
                    if (empty_above && empty_below && empty_left && !empty_right)
                    {
                        //left horiz
                        this.map.putTileAt(3, tx, ty);
                    }
                    if (empty_above && empty_below && empty_right && !empty_left)
                    {
                        //right horiz
                        this.map.putTileAt(4, tx, ty);
                    }
                    

                    //////
                    if (empty_left && empty_right && !empty_above && !empty_below)
                    {
                        //middle verti
                        this.map.putTileAt(5, tx, ty);
                    }
                    if (empty_left && empty_right && empty_above && !empty_below)
                    {
                        //top verti
                        this.map.putTileAt(6, tx, ty);
                    }
                    if (empty_left && empty_right && empty_below && !empty_above)
                    {
                        //bottom verti
                        this.map.putTileAt(7, tx, ty);
                    }


                    //////


                    if (empty_below && !empty_right && !empty_left && !empty_above)
                    {
                        //up t
                        this.map.putTileAt(8, tx, ty);
                    }
                    if (empty_above && !empty_right && !empty_left && !empty_below)
                    {
                        //down t
                        this.map.putTileAt(9, tx, ty);
                    }
                    if (empty_right && !empty_left && !empty_below && !empty_above)
                    {
                        //left t
                        this.map.putTileAt(10, tx, ty);
                    }
                    if (empty_left && !empty_right && !empty_below && !empty_above)
                    {
                        //right t
                        this.map.putTileAt(11, tx, ty);
                    }
                    
                    


                    //////
                    if (empty_left && empty_above && !empty_right && !empty_below)
                    {
                        //right down corner
                        this.map.putTileAt(12, tx, ty);
                    }
                    if (empty_right && empty_above && !empty_left && !empty_below)
                    {
                        //left down corner
                        this.map.putTileAt(13, tx, ty);
                    }
                    if (empty_left && empty_below && !empty_right && !empty_above)
                    {
                        //right up corner
                        this.map.putTileAt(14, tx, ty);
                    }
                    if (empty_right && empty_below && !empty_left && !empty_above)
                    {
                        //left up corner
                        this.map.putTileAt(15, tx, ty);
                    }

                    

                    

                    //////
                    if (empty_above && empty_below && empty_right && empty_left)
                    {
                        // single island
                        this.map.putTileAt(16, tx, ty);
                    }

                    if (!empty_above && !empty_below && !empty_right && !empty_left)
                    {
                        // cross
                        this.map.putTileAt(17, tx, ty);
                    }
                    

                }
            }
        }
    }

});

