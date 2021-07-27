const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Note } = require('../../db/models');

const router = express.Router();


router.get(
    '/:id',
    asyncHandler(async (req, res) => {
      
      const note = await Users.findOne({where:{id:req.params.id }});
    
      return res.json({
        note,
      });
    }),
  );

router.post(
    '/new',
    asyncHandler(async (req, res) => {
      const {keep,user,title} = req.body;
      const note = {userId:user,noteText:keep,title};
      newNote = await Note.create(note)
      return res.json({
        note:newNote,
      });
    }),
  );

router.post(
    '/delete',
    asyncHandler(async (req, res) => {
      const {id} = req.body;
      console.log(id)
      const note = await Note.findOne({ where: { id }});
      note.destroy()
      return res.json({
        note,
      });
    }),
  );

router.post(
    '/update',
    asyncHandler(async (req, res) => {
      const {id, newText, newTitle} = req.body;
      const note = await Note.findOne({where: id });
      note.update({noteText : newText, title: newTitle})
      return res.json({
        note,
      });
    }),
  );

module.exports = router;