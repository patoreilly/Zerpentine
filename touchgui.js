var Touchgui = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Touchgui ()
    {
        Phaser.Scene.call(this, { key: 'touchgui', active: false });
    },

    init: function (data)
    {
        
    },

    preload: function ()
    {
        

    },

    create: function ()
    {

        this.input.addPointer(1);
        this.textures.generate('chunk', { data: ['1'], pixelWidth: 1});

        guide_multi = this.add.image(560,296,'chunk').setDisplaySize(128, 128).setAlpha(.5).setDepth(200);
        

        this.textures.generate('h_arrow', { data: guideInputHorizontalData, pixelWidth: 2});
        this.textures.generate('v_arrow', { data: guideInputVerticalData, pixelWidth: 2});

        guide_left = this.add.image(520,296,'h_arrow').setAlpha(.5).setDepth(200).setScale(2).setInteractive();
        guide_right = this.add.image(600,296,'h_arrow').toggleFlipX().setAlpha(.5).setDepth(200).setScale(2).setInteractive();

        guide_up = this.add.image(560,256,'v_arrow').setAlpha(.5).setDepth(200).setScale(2).setInteractive();
        guide_down = this.add.image(560,336,'v_arrow').toggleFlipY().setAlpha(.5).setDepth(200).setScale(2).setInteractive();

        guide_left.on('pointerover', function () {guiLeft = true}, this);
        guide_right.on('pointerover', function () {guiRight = true}, this);
        guide_up.on('pointerover', function () {guiUp = true}, this);
        guide_down.on('pointerover', function () {guiDown = true}, this);

        guide_left.on('pointerout', function () {guiLeft = false}, this);
        guide_right.on('pointerout', function () {guiRight = false}, this);
        guide_up.on('pointerout', function () {guiUp = false}, this);
        guide_down.on('pointerout', function () {guiDown = false}, this);

        
        access_menu = this.add.image(630,10,'a_menu').setAlpha(1).setInteractive();
        access_menu.on('pointerdown', function () { var menus = this.scene.get('menus'); menus.displayHideMenu(); } , this);

    },

    update: function()
    {


    }

});