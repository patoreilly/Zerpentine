var Rulez = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Rulez ()
    {
        Phaser.Scene.call(this, { key: 'rulez', active: false });
    },

    init: function (data)
    {
        
    },

    preload: function ()
    {
        //this.load.image('Bubble Memories', 'gui/Bubble Memories (Taito).png');

    },

    create: function ()
    {
        
        var bgimg = this.add.image(0,50,'chunk3').setOrigin(0).setDisplaySize(640,350).setDepth(0);

        // this.access_menu = this.add.image(310,10,'a_menu').setAlpha(1).setInteractive();
        // this.access_menu.on('pointerdown', function () { var menus = this.scene.get('menus'); menus.displayHideMenu(); } , this);

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

        var nt_config2 = {
        image: 'Nintendo',
        width: 8,
        height: 8,
        chars: Phaser.GameObjects.RetroFont.TEXT_SET1,
        charsPerRow: 96,
        spacing: { x: 0, y: 0 },
        offset: {y:0}
        };

        var nt_config3 = {
        image: 'Nintendo',
        width: 8,
        height: 8,
        chars: Phaser.GameObjects.RetroFont.TEXT_SET1,
        charsPerRow: 96,
        spacing: { x: 0, y: 0 },
        offset: {y:24}
        };

        var nt_config4 = {
        image: 'Nintendo',
        width: 8,
        height: 8,
        chars: Phaser.GameObjects.RetroFont.TEXT_SET1,
        charsPerRow: 96,
        spacing: { x: 0, y: 0 },
        lineSpacing: 8,
        offset: {y:16}
        };

        var nt_config5 = {
        image: 'Nintendo',
        width: 8,
        height: 8,
        chars: Phaser.GameObjects.RetroFont.TEXT_SET1,
        charsPerRow: 96,
        spacing: { x: 0, y: 0 },
        lineSpacing: 8,
        offset: {y:8}
        };

        this.cache.bitmapFont.add('headtext', Phaser.GameObjects.RetroFont.Parse(this, nt_config1));

        this.cache.bitmapFont.add('labeltext', Phaser.GameObjects.RetroFont.Parse(this, nt_config2));
        this.cache.bitmapFont.add('infotext', Phaser.GameObjects.RetroFont.Parse(this, nt_config3));

        this.cache.bitmapFont.add('infotext1', Phaser.GameObjects.RetroFont.Parse(this, nt_config4));
        this.cache.bitmapFont.add('infotext2', Phaser.GameObjects.RetroFont.Parse(this, nt_config5));


        this.cache.bitmapFont.add('foottext', Phaser.GameObjects.RetroFont.Parse(this, nt_config1));
        
        
        var text1 = this.add.dynamicBitmapText(0, 0, 'headtext', "Advance to next level once all enemy zerpents in the maze are eliminated.\nEnemy zerpents can be eliminated by you or spiders.")
        .setOrigin(.5).setScale(1).setCenterAlign().setPosition(320,100).setDepth(100);

        var text2 = this.add.dynamicBitmapText(0, 0, 'headtext', "Spiders destroy any zerpent via head contact no matter the length.")
        .setOrigin(.5).setScale(1).setCenterAlign().setPosition(320,150).setDepth(100);

        var text3 = this.add.dynamicBitmapText(0, 0, 'headtext', "Zerpents can safely eat the body sections of any enemy zerpent.\nZerpent length determines the winner of head on collisions.")
        .setOrigin(.5).setScale(1).setCenterAlign().setPosition(320,200).setDepth(100);

        var text4 = this.add.dynamicBitmapText(0, 0, 'headtext', "Zerpents you can eat head on turn      .")
        .setOrigin(.5).setScale(1).setCenterAlign().setPosition(320,235).setDepth(100);

        var text4a = this.add.dynamicBitmapText(0, 0, 'infotext2', "                                  GREEN ")
        .setOrigin(.5).setScale(1).setCenterAlign().setPosition(320,235).setDepth(100);

        this.add.image( 100, 240,'green_section');
        this.add.image( 116, 240,'green_section');
        this.add.image( 132, 240,'green_head');


        var text5 = this.add.dynamicBitmapText(0, 0, 'headtext', "Zerpents who can eat you head on turn    .")
        .setOrigin(.5).setScale(1).setCenterAlign().setPosition(320,260).setDepth(100);

        var text5a = this.add.dynamicBitmapText(0, 0, 'infotext1', "                                      RED ")
        .setOrigin(.5).setScale(1).setCenterAlign().setPosition(320,260).setDepth(100);

        this.add.image( 540, 240,'red_section');
        this.add.image( 524, 240,'red_section');
        this.add.image( 508, 240,'red_head').setAngle(180);



        var text6 = this.add.dynamicBitmapText(0, 0, 'headtext', 
            "Player zerpent can grow by eating other zeprents or sploders.\nSploders are special body sections that explode when contacted.\nOnly sploders can destroy spiders.")
        .setOrigin(.5).setScale(1).setCenterAlign().setPosition(320,315).setDepth(100);

        this.add.sprite( 300, 350,'sploder').play('sploder_animation');

        this.add.sprite( 340, 350,'atest3').play('spawnloop_animation');

        

        // var text3 = this.add.dynamicBitmapText(0, 0, 'labeltext', "Game Design:").setOrigin(1,1).setScale(1).setRightAlign().setPosition(312,120).setDepth(100);
        // var text4 = this.add.dynamicBitmapText(0, 0, 'labeltext', "Coding Credits:").setOrigin(1,1).setScale(1).setRightAlign().setPosition(312,140).setDepth(100);
        // var text5 = this.add.dynamicBitmapText(0, 0, 'labeltext', "Art Credits:").setOrigin(1,1).setScale(1).setRightAlign().setPosition(312,160).setDepth(100);

        // var text6 = this.add.dynamicBitmapText(0, 0, 'infotext', "@pato_reilly").setOrigin(0,1).setScale(1).setLeftAlign().setPosition(328,120).setDepth(100);
        // var text7 = this.add.dynamicBitmapText(0, 0, 'infotext', "@javidx9 @phaser_").setOrigin(0,1).setScale(1).setLeftAlign().setPosition(328,140).setDepth(100);
        // var text8 = this.add.dynamicBitmapText(0, 0, 'infotext', "Epyx -Super Cycle-").setOrigin(0,1).setScale(1).setLeftAlign().setPosition(328,160).setDepth(100);



        // var text9 = this.add.dynamicBitmapText(0, 0, 'labeltext2', "Menu show/hide:").setOrigin(1,1).setScale(1).setRightAlign().setPosition(312,200).setDepth(100);
        // var text10 = this.add.dynamicBitmapText(0, 0, 'labeltext2', "Menu Select:").setOrigin(1,1).setScale(1).setRightAlign().setPosition(312,220).setDepth(100);
        // var text11 = this.add.dynamicBitmapText(0, 0, 'labeltext2', "Music on/off:").setOrigin(1,1).setScale(1).setRightAlign().setPosition(312,240).setDepth(100);

        // var text12 = this.add.dynamicBitmapText(0, 0, 'infotext2', "ESC, Gamepad L1").setOrigin(0,1).setScale(1).setLeftAlign().setPosition(328,200).setDepth(100);
        // var text13 = this.add.dynamicBitmapText(0, 0, 'infotext2', "ENTER, Gamepad A").setOrigin(0,1).setScale(1).setLeftAlign().setPosition(328,220).setDepth(100);
        // var text4 = this.add.dynamicBitmapText(0, 0, 'infotext2', "Gamepad X").setOrigin(0,1).setScale(1).setLeftAlign().setPosition(328,240).setDepth(100);



        // var text15 = this.add.dynamicBitmapText(0, 0, 'foottext', "2024").setOrigin(.5,1).setScale(2).setCenterAlign().setPosition(320,300).setDepth(100);


    },

    update: function()
    {


    }

});