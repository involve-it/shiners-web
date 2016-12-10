import Model from './AsteroidModel.js';

export default Model.extend({
    save() {
        
    },

    validation: {

        type: {
            required:true
        },

        'details.title': {
            required: true
        }
    }
});

//addPost(request, currentLocation)

//curentLocation={lat, lng}

//request={details, type, tags, jobsDetails, trainingDetails}

//details={anonymousPost,
//    url,
//    title,
//    description,
//    price,
//    photos,
//    other}

//photo = {
//    data,
//    thumbnail
//};

//jobsDetails={seniority,
//    gender,
//    contacts,
//    attachment,
//    typeCategory,
//    jobsType,
//    payMethod}

//trainingsDetails = {
//    sectionLearning,
//    typeCategory
//}

//return {success: true, result: post}