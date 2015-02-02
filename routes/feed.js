
/*
 * GET feed page.
 */

exports.index = function(req, res){
  res.render('feed', { title: 'this is the feed!' });
};