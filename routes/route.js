const router = require('express').Router();
const path = require('path');
const Fitness = require('../model/fitness');


router.get('/exercise',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/exercise.html'));
});
router.get('/stats',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/stats.html'));
});
router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/index.html'));
});

//get workouts
router.get('/api/workouts',(req,res)=> {
Fitness.aggregate([{
    $addFields:{
        totalDuration:{$sum: '$exercises.duration'},
        totalReps:{$sum: '$exercises.reps'},
        totalSets:{$sum: '$exercises.sets'},
        totalWeight:{$sum: '$exercises.weight'},
    },
}]).then((dbFitness) =>{res.json(dbFitness);
})
.catch((err)=> {res.status(400).json(err);
});
});

//new workouts
router.post('/api/workouts', ({body}, res) =>{
    Fitness.create(body)
    .then((dbFitness) => {res.json(dbFitness);
    })
    .catch((err)=>{res.status(400).json(err);
    });
});

//workout range
router.get('/api/workouts/range', (res,res) =>{
    Fitness.aggregate([{
        $addFields:{
            totalDuration:{$sum: '$exercises.duration'},
            totalReps:{$sum: '$exercises.reps'},
            totalSets:{$sum: '$exercises.sets'},
            totalWeight:{$sum: '$exercises.weight'},
        },
    }]).sort({day: -1})
       .limit(7)
       .then((dbFitness)=>{res.json(dbFitness);
    })
    .catch((err)=>{res.status(400).json(err);
    });    
});

//update by id
router.put('/api/workouts/:id',(req,res) => {
    Fitness.findUpdate(
        {_id:req.params.id},
        {$push: {exercises:req.body},
    }
).then((dbFitness)=> {res.json(dbFitness);
})
.catch((err) => {res.status(400).json(err);
});
});

module.exports = router;