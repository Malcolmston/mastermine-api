const sqlite3 = require("sqlite3");
const { Sequelize, DataTypes, Op, QueryTypes, where } = require("sequelize");

const db = new sqlite3.Database("game.sqlite");


//https://github.com/sequelize/sequelize/issues/10304
const sequelize = new Sequelize("plays", "", "", {
	dialect: "sqlite",
	storage: "game.sqlite",
	benchmark: true,
	standardConformingStrings: true,
});


const Game = sequelize.define(
    "game",
    {
        id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},

        gameName: {
			type: DataTypes.TEXT,
			allowNull: false,
			unique: true,
		}
    }, {
        timestamps: true
    })

    const Play = sequelize.define("play", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
    
        guess: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
        }
    });

    
    Game.hasMany(Play);
    Play.belongsTo(Game);


    Play.sync();


      /**
     * this fucntion gets weter or no a game name exsists
     * @param {String} name the nome of the game you want to create
     * @returns true it the name exsists and retruns false if not
     */
      async function nameExsist(name){
        let a = await Game.findOne({where: {
            gameName: gameNnft
        }})

        return a == null ? false : true
    }

/**
 * a symple function that creates a game with a name
 * @param {String} gameName the game name
 * @returns {Sequelize} the value of the created game and undifined if the name alredy exsits
 */
    async function Game_create(gameName){   
        if( await nameExsist(gameName) ) return;
        return await Game.create({gameName});
    }

  

    /**
     * this function adds the users game moves to the Play databace
     * @param {Number | String} gameNnft is either a number corisponding to the game Id or the name witch must be a string.
     * @param {Array} move the moves that you are making.
     * @returns {Sequelize | undefined} a object that contains a secsessfull push into a databace. if there is an isue than undifined.
     */
    async function Game_addMove(gameNnft, move){
        let place;
        let a;

        if( typeof gameNnft == "String" || typeof gameNnft == "string"){
             a = await Game.findOne({where: {
                gameName: gameNnft
            }})

            if(a == null) return;

            place = a.toJSON().id
        }
        if( typeof gameNnft == "Number" || typeof gameNnft == "number"){
             a = await Game.findByPk( gameNnft )

            if(a == null) return;       
            
            place = a.toJSON().id
        }

        

        let s = await Play.bulkCreate(move.map( move =>  {
           return { guess: move, gameId: place} 
        }))
        return s.length == 0 ? undefined : s
    }

   // Game_create("a").then( (x) => {
      //  console.log( x )
        
   // })

   (async function () {
	await sequelize.sync({ force: true });

   // console.log( await Game_create("a") )
   // console.log( await Game_addMove("a", [1,2,5,6]) )
   })()

   module.exports = {
	Game_create,
	Game_addMove
};