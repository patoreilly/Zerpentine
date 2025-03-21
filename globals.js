var config = {
    type: Phaser.WEBGL,
    parent: 'phaser-example',
    width: 640,
    height: 400,
    //transparent: true,
    //backgroundColor: '#000000',
    roundPixels: true,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            //gravity: { y: 0 },
            debug: false
        }
    },

    input: {
        gamepad: true
    },
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 640,
        height: 400
    },
    audio: {
        disableWebAudio: true
    },
    scene: [Setup, Zerpentine, Menus, Touchgui, Rulez, Bugz, About]
};

var game = new Phaser.Game(config);

var file_thumbs = [];
var allImageKeys = [];

//for textcallback
var i = 0;
var j = 1.0; 
var hsv = [];
var hsvindex=0;
//

var menu_mode=true;
var demo_mode=true;

var sound_enabled;
var fullscreen_enabled=false;
var music;
var SIDplayer;
var audioIndex=0;
var touchActivated=false;
var gamepad=false;

var keys;
var cursors;
                            
var guide_multi_activeY;
var guide_multi;
var guide_zspeed;
var guide_left;
var guide_right;
var guide_forward;
var guide_back;
var guide_up;
var guide_down;

var gTouching = false;
var guiLeft = false;
var guiRight = false;
var guiForward = false;
var guiBack = false;
var guiUp = false;
var guiDown = false;

var player;
var demobot;
var cursors;

var myCam;
var UIcam;
var camera_ignorestuff = [];

var audioList = [

'3_Days.sid',
'Agent_of_Lies.sid',
'Glowtones.sid',
'Matrix_01.sid',
'New_Blood.sid',
'Lumina.sid',
'GULBdata.sid',
'Gorilla.sid',
'One_Must_Fall_2097.sid',
'Holocaust_Intro.sid',
'Jamaica_10_intro.sid',
'Methane_01.sid',
'Long_Train_Running.sid',
'Helikopter.sid',
'A_True_Story.sid',
'Eighties_Megahit.sid'

];


///// special case contants and global context holder

var this_context;

const _NONE = 0;
const _LEFT = 1;
const _RIGHT = 2;
const _UP = 3;
const _DOWN = 4;

//////

var guide_multi_activeY;
var guide_multi;
var guide_zspeed;
var guide_left;
var guide_right;
var guide_forward;
var guide_back;
var guide_up;
var guide_down;

var guiLeft = false;
var guiRight = false;
var guiForward = false;
var guiBack = false;
var guiUp = false;
var guiDown = false;

var hexdigit1 = 50;
var hexdigit2 = 67;
var hexdigit3 = 155;

var hex1increment = -2;
var hex2increment = 3;
var hex3increment = -6;


var access_menu;
var accessMenuData = [
"................",
"................",
"................",
"..222222222222..",
"..222222222222..",
"................",
"................",
"..222222222222..",
"..222222222222..",
"................",
"................",
"..222222222222..",
"..222222222222..",
"................",
"................",
"................"
];

var guideInputHorizontalData = [
".........22.....",
"........222.....",
".......2222.....",
"......22222.....",
".....222222.....",
"....2222222.....",
"...22222222.....",
"..222222222.....",
"..222222222.....",
"...22222222.....",
"....2222222.....",
".....222222.....",
"......22222.....",
".......2222.....",
"........222.....",
".........22....."
];


var guideInputVerticalData = [
"................",
"................",
".......22.......",
"......2222......",
".....222222.....",
"....22222222....",
"...2222222222...",
"..222222222222..",
".22222222222222.",
"2222222222222222",
"2222222222222222",
"................",
"................",
"................",
"................",
"................"
];


var sound_off = [
"................",
".......2........",
"......22........",
".....2.2........",
"....2..2........",
".222...2.2....2.",
".2.....2..2..2..",
".2.....2...22...",
".2.....2...22...",
".2.....2..2..2..",
".222...2.2....2.",
"....2..2........",
".....2.2........",
"......22........",
".......2........",
"................"];

var sound_on = [
"................",
".......2........",
"......22........",
".....2.2...2....",
"....2..2....2...",
".222...2.2...2..",
".2.....2..2..2..",
".2.....2..2..2..",
".2.....2..2..2..",
".2.....2..2..2..",
".222...2.2...2..",
"....2..2....2...",
".....2.2...2....",
"......22........",
".......2........",
"................"];



var audioList = [
'Ghost_Bunny.sid'
// '3_Days.sid',
// 'Agent_of_Lies.sid',
// 'Glowtones.sid',
// 'Matrix_01.sid',
// 'New_Blood.sid',
// 'Lumina.sid',
// 'GULBdata.sid',
// 'Gorilla.sid',
// 'One_Must_Fall_2097.sid',
// 'Holocaust_Intro.sid',
// 'Jamaica_10_intro.sid',
// 'Methane_01.sid',
// 'Long_Train_Running.sid',
// 'Helikopter.sid',
// 'A_True_Story.sid',
// 'Eighties_Megahit.sid'

];






var middle_horiz = [
"................",
"................",
"................",
"................",
"................",
"................",
"................",
"FFFFFFFD5FFFFFFF",
"EEEEEEED5EEEEEEE",
"................",
"................",
"................",
"................",
"................",
"................",
"................"
];

var left_horiz = [
"................",
"................",
"................",
"................",
"................",
"................",
".......D........",
".......D5FFFFFFF",
".......D5EEEEEEE",
".......D........",
"................",
"................",
"................",
"................",
"................",
"................"
];

var right_horiz = [
"................",
"................",
"................",
"................",
"................",
"................",
"........D.......",
"FFFFFFF5D.......",
"EEEEEEE5D.......",
"........D.......",
"................",
"................",
"................",
"................",
"................",
"................"
];

var middle_verti = [
".......FE.......",
".......FE.......",
".......FE.......",
".......FE.......",
".......FE.......",
".......FE.......",
".......FE.......",
".......DD.......",
".......55.......",
".......FE.......",
".......FE.......",
".......FE.......",
".......FE.......",
".......FE.......",
".......FE.......",
".......FE......."
];

var top_verti = [
"................",
"................",
"................",
"................",
"................",
"................",
"................",
"......DDDD......",
".......55.......",
".......FE.......",
".......FE.......",
".......FE.......",
".......FE.......",
".......FE.......",
".......FE.......",
".......FE......."
];

var bottom_verti = [
".......FE.......",
".......FE.......",
".......FE.......",
".......FE.......",
".......FE.......",
".......FE.......",
".......FE.......",
".......DD.......",
"......5555......",
"................",
"................",
"................",
"................",
"................",
"................",
"................"
];

var up_t = [
".......FE.......",
".......FE.......",
".......FE.......",
".......FE.......",
".......FE.......",
".......FE.......",
".......FE.......",
"FFFFFFFFFFFFFFFF",
"EEEEEEEEEEEEEEEE",
"................",
"................",
"................",
"................",
"................",
"................",
"................"
];

var down_t = [
"................",
"................",
"................",
"................",
"................",
"................",
"................",
"FFFFFFFFFFFFFFFF",
"EEEEEEEEEEEEEEEE",
".......FE.......",
".......FE.......",
".......FE.......",
".......FE.......",
".......FE.......",
".......FE.......",
".......FE......."
];

var left_t = [
".......FE.......",
".......FE.......",
".......FE.......",
".......FE.......",
".......FE.......",
".......FE.......",
".......FE.......",
"FFFFFFFFE.......",
"EEEEEEEFE.......",
".......FE.......",
".......FE.......",
".......FE.......",
".......FE.......",
".......FE.......",
".......FE.......",
".......FE......."
];

var right_t = [
".......FE.......",
".......FE.......",
".......FE.......",
".......FE.......",
".......FE.......",
".......FE.......",
".......FE.......",
".......FEFFFFFFF",
".......FEEEEEEEE",
".......FE.......",
".......FE.......",
".......FE.......",
".......FE.......",
".......FE.......",
".......FE.......",
".......FE......."
];

var right_down_corner = [
"................",
"................",
"................",
"................",
"................",
"................",
"................",
".........FFFFFFF",
"........FEEEEEEE",
".......FE.......",
".......FE.......",
".......FE.......",
".......FE.......",
".......FE.......",
".......FE.......",
".......FE......."
];

var left_down_corner = [
"................",
"................",
"................",
"................",
"................",
"................",
"................",
"FFFFFFF.........",
"EEEEEEEF........",
".......FE.......",
".......FE.......",
".......FE.......",
".......FE.......",
".......FE.......",
".......FE.......",
".......FE......."
];

var right_up_corner = [
".......FE.......",
".......FE.......",
".......FE.......",
".......FE.......",
".......FE.......",
".......FE.......",
".......FE.......",
"........EFFFFFFF",
".........EEEEEEE",
"................",
"................",
"................",
"................",
"................",
"................",
"................"
];

var left_up_corner = [
".......FE.......",
".......FE.......",
".......FE.......",
".......FE.......",
".......FE.......",
".......FE.......",
".......FE.......",
"FFFFFFFE........",
"EEEEEEE.........",
"................",
"................",
"................",
"................",
"................",
"................",
"................"
];

var single_island = [
"................",
"................",
"................",
"................",
".....FFFFFF.....",
"....FFEDDEFF....",
"....FED55DEF....",
"....FD5555DF....",
"....FD5555DF....",
"....FED55DEF....",
"....FFEDDEFF....",
".....FFFFFF.....",
"................",
"................",
"................",
"................"
];

var cross = [
".......FE.......",
".......FE.......",
".......FE.......",
".......FE.......",
".......FE.......",
".......FE.......",
".......FE.......",
"FFFFFFFFEFFFFFFF",
"EEEEEEEFEEEEEEEE",
".......FE.......",
".......FE.......",
".......FE.......",
".......FE.......",
".......FE.......",
".......FE.......",
".......FE......."
];



var tile_wall =[
"................",
".22222222222222.",
".22222222222222.",
".22222222222222.",
".22222222222222.",
".22222222222222.",
".22222222222222.",
".22222222222222.",
".22222222222222.",
".22222222222222.",
".22222222222222.",
".22222222222222.",
".22222222222222.",
".22222222222222.",
".22222222222222.",
"................"
];


var tile_space =[
"................",
"................",
"................",
"................",
"................",
"................",
"................",
"................",
"................",
"................",
"................",
"................",
"................",
"................",
"................",
"................"
];

var player_head =[
"....65565656....",
"..B5665665575B..",
".B556556655755B.",
".555556652265CC.",
"555857552202C99C",
"668777A72202C..C",
"5887B7A76226C...",
"588B77B76666C...",
"5877777A6566C...",
"5878B7A76226C...",
"567777752202C..C",
"555857762202C99C",
".555565552266CC.",
".B556565665755B.",
"..B6555655575B..",
"....56565566...."
];

var player_body =[
"....65565656....",
"..B5665665575B..",
".B556556655755B.",
".5555566565665A.",
"5558575566556667",
"668777A766555556",
"5887B7A756655686",
"588B77B767565556",
"5877777A67665556",
"5878B7A765665586",
"56777775656555C6",
"5558577665558666",
".55556555655566.",
".B556565655555B.",
"..B6555655575B..",
"....56565566...."
];



var palette_cga = {
    0: '#000',
    1: '#2234d1',
    2: '#0c7e45',
    3: '#44aacc',
    4: '#8a3622',
    5: '#5c2e78',
    6: '#aa5c3d',
    7: '#b5b5b5',
    8: '#5e606e',
    9: '#4c81fb',
    A: '#6cd947',
    B: '#7be2f9',
    C: '#eb8a60',
    D: '#e23d69',
    E: '#ffd93f',
    F: '#fff'
};

var palette_c64 = {
    0: '#000',
    1: '#fff',
    2: '#8b4131',
    3: '#7bbdc5',
    4: '#8b41ac',
    5: '#6aac41',
    6: '#3931a4',
    7: '#d5de73',
    8: '#945a20',
    9: '#5a4100',
    A: '#bd736a',
    B: '#525252',
    C: '#838383',
    D: '#acee8b',
    E: '#7b73de',
    F: '#acacac'
};

var palette_arne16 = {
    0: '#000',
    1: '#9D9D9D',
    2: '#FFF',
    3: '#BE2633',
    4: '#E06F8B',
    5: '#493C2B',
    6: '#A46422',
    7: '#EB8931',
    8: '#F7E26B',
    9: '#2F484E',
    A: '#44891A',
    B: '#A3CE27',
    C: '#1B2632',
    D: '#005784',
    E: '#31A2F2',
    F: '#B2DCEF'
};

var palette_jmp = {
    0: '#000',
    1: '#191028',
    2: '#46af45',
    3: '#a1d685',
    4: '#453e78',
    5: '#7664fe',
    6: '#833129',
    7: '#9ec2e8',
    8: '#dc534b',
    9: '#e18d79',
    A: '#d6b97b',
    B: '#e9d8a1',
    C: '#216c4b',
    D: '#d365c8',
    E: '#afaab9',
    F: '#f5f4eb'
};

