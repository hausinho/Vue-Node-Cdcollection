const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Album = require('../models/album');

// GET ALL ALBUMS
router.get('/', (req, res, next) => {
  Album.find()
    .select("artist album _id")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        albums: docs.map(doc => {
          return {
            artist: doc.artist,
            album: doc.album,
            _id: doc._id
          };
        })
      };
  
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});


// ADD NEW ALBUM
router.post('/', (req, res, next) => {
  if (!req.body.artist || !req.body.album) {
    res.json({success: false, message: 'Please enter artist and album.'});
} else {  
  const album = new Album({
    _id: new mongoose.Types.ObjectId(),
    artist: req.body.artist,
    album: req.body.album
  });
  album
    .save()
    .then(result => {
      console.log('res: ', result)
      res.status(201).json({
        message: "Album added successfully",
        createdAlbum: {
            artist: result.artist,
            album: result.album,
            _id: result._id
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
  }
});

// GET ALBUM BY ID
router.get("/:albumId", (req, res, next) => {
  const id = req.params.albumId;
  Album.findById(id)
    .select('artist album _id')
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json({
            album: doc
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

// UPDATE ALBUM
// router.put('/:albumId', (req, res, next) => {
//   const id = req.params.albumId;
//   console.log('ID: ', req.params)
//   const updateOpt = {};
//   for (const opt of req.body) {
//     updateOpt[opt.propName] = opt.value
//   }
// console.log('UPDATE: ', updateOpt)

//   Album.update({_id: id}, {$set: updateOpt })
//   .exec()
//   .then(result => {
//     res.status(200).json({
//         message: 'Album updated'
//     });
//   })
//   .catch(err => {
//     res.status(500).json({
//       error: err
//     });
//   });  
// });

// UPDATE ALBUM
router.put('/:albumId', (req, res, next) => {
  Album.findById(req.params.albumId, 'artist album', function (error, post) {
    if (error) { console.error(error); }

    post.artist = req.body.artist
    post.album = req.body.album
    post.save((error) => {
      if (error) {
        console.log(error)
      }
      res.status(200).json({
        message: 'Album updated',
        updatedAlbum: {
          artist: post.artist,
          album: post.album
        }
      });      
    })
  }) 
})

// DELETE ALBUM
router.delete('/:albumId', (req, res, next) => {
  const id = req.params.albumId;
  Album.remove({_id: id})
  .exec()
  .then(result => {
    res.status(200).json(result)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    })
  })
});

module.exports = router;