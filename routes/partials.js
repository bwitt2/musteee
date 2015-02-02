/** serve jade enabled partials */
exports.partials = function(req, res) {
    console.log(req.params.name);
    res.render('partials/' + req.params.name);
};