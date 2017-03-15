const request = require('request');
const db = require('./db/schema');

exports.createUser = function (req, res) {

};
exports.addToGroup = function (req, res) {
  console.log(req.body); //  groupName: 'Group1', friendName: 'asdf', userID: 12
  db.User.findOne({ where: { username: req.body.friendName } }).then((results) => {
    if (results) {
      console.log(results.id);
      const newRequest = db.PendingInvites.build({
        sentBy: req.body.userID,
        UserId: results.id,
        GroupId: req.body.groupID,
      });
      newRequest.save()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err)
      });
    } else {
      console.log('error!');
    }
  })
  .catch((err) => {
    console.log(err);
    console.log('not found');
  });
};

exports.returnUserData = function (req, res) {
  db.User.findOne({ where: { username: req.query.username } }).then((results) => {
    db.UserGroup.findAll({
      where: {userId: results.id}
    })
    .then((groupIDs) => {
      var myGroups = [];
      for (var i=0; i<groupIDs.length; i++) {
        myGroups.push(groupIDs[i].GroupId);
      }
      db.Group.findAll({
        include: [
          {model: db.User, through: {
            where: {GroupId: myGroups}
          }}
        ]
      }).then((data) => {
        res.send(data);
      })
    })

  })
};

exports.createGroup = function (req, res) {

};

exports.createHistory = function (req, res) {

};

const getBearer = function (cb) {
  const options = { method: 'POST',
    url: 'https://api.yelp.com/oauth2/token',
    headers:
    { 'postman-token': 'c465c84a-3343-1ece-227e-07bd5a1d10b8',
      'cache-control': 'no-cache',
      'content-type': 'application/x-www-form-urlencoded' },
    form:
    { client_id: '9JNu_Qv6gcSDeJfRp0QeJw',
      client_secret: '7PgGA0q6SORkr8xaB1Be568k648NrVK5B0ACV65ZcXpcW4bRfYr2ADphGkXZ4YYV',
      grant_type: 'client_credentials' } };

  request(options, (error, response, body) => {
    if (error) throw new Error(error);

    cb(body);
  });
};


exports.getActivity = function (req, res, query) {
  const cb = function (token) {
    const bearer = JSON.parse(token).access_token;
    const options = { method: 'GET',
      url: 'https://api.yelp.com/v3/businesses/search',
      qs:
      { term: query.term,
        category_filter: query.filter,
        location: query.zip,
        sort_by: 'rating',
        limit: '50' },
      headers:
      { 'postman-token': '93676d7e-657a-46fd-71fc-a9b2fcf909a5',
        'cache-control': 'no-cache',
        authorization: `Bearer ${bearer}` } };
    console.log(options.headers);
    request(options, (error, response, body) => {
      if (error) throw new Error(error);

      res.send(body);
      res.end();
    });
  };
  getBearer(cb);
};

