
// main purpose of reducers is to update state*/
// http://az616578.vo.msecnd.net/files/2016/03/18/635938589851171129-1119557603_food-buffet-1134498.jpg
// const food = require('../../output/assets/food.jpg');

let initialState = {
  finalSelection: false,
  zipCode: false,
  showAll: [],

  firstLoad: [
    { img: './assets/food.jpg', option: 'food' },
    { img: './assets/party.jpg', option: 'party' },
    { img: './assets/sports.jpg', option: 'sports' },
    { img: './assets/relax.jpg', option: 'relax' },
    { img: './assets/activity.jpg', option: 'activity' },
    { img: './assets/Idkgoat.png', option: 'any' },
  ],
 /* dayLoad: [
    { name: 'food' },
    { image: 'kale' },
    { phone: 'kale' },
    { distance: 'kale' },
  ],*/
};

//all these reducers update state coming from action handlers in index.jsx for respective Components
export default function (state = initialState, action) {
  switch (action.type) {
    case 'CHOICES_SELECTED':
      return Object.assign({}, state, {
        firstLoad: action.payload,
    });
    case 'FINAL_SELECTED':
      return Object.assign({}, state, {
        firstLoad: action.payload,
        finalSelection: true,
    });
    case 'ZIP_SUBMITTED':
      return Object.assign({}, state, {
        updatedZipcode: action.payload,
        zipCode: true,
    });
    case 'DAY_SELECTED':
      return Object.assign({}, state, {
        dayLoad: action.payload,
    });
    case 'DAY_SELECTED2':
      return Object.assign({}, state, {
        dayLoadtwo: action.payload,
    });
    case 'DAY_SELECTED3':
      return Object.assign({}, state, {
        dayLoadthree: action.payload,
    });
    case 'DAY_SELECTED4':
      return Object.assign({}, state, {
        dayLoadfour: action.payload,
    });
    case 'DAY_SELECTED5':
      return Object.assign({}, state, {
        dayLoadfive: action.payload,
    });
    case 'DAY_SELECTED6':
      return Object.assign({}, state, {
        dayLoadsix: action.payload,
    });
    case 'BROWSE':
      return Object.assign({}, state, {
        showAll: state.showAll.concat(action.payload.data),
    });
    case 'GOBACK':
      return Object.assign({}, state, {
        finalSelection: false,
        firstLoad: initialState.firstLoad,
    });
  }
  return state;
}

// main purpose of reducers is to update state

