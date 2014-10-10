var mongoose = require('mongoose');

// create new job
exports.create_job = function create_job(username, smiles, callback){
  var Job = mongoose.model('Job');
  var job = new Job({
    username: username,
    smiles: smiles
  });
  job.save(function(err, job){
    if (err) {
      console.log(err);
      callback('error');
    } else {
      console.log(job);
      callback('success', job);
    }
  });
};

// update job status
exports.update_job_status = function update_job_status(id, status, callback){
  var Job = mongoose.model('Job');
  Job.findOneAndUpdate({_id: id}, {status: status}, function(err){
    if (err) {
      callback('error');
    } else {
      callback('success');
    }   
  });
};

// get progress
exports.get_job_progress = function get_job_progress(id, callback){
  var Job = mongoose.model('Job');
  Job.findById(id, function(err, result){
    if (err) {
      callback('error');
    } else {
      callback('success', result.progress);
    }
  });
};

// increment progress
exports.increment_job_progress = function increment_job_progress(id, callback){
  var Job = mongoose.model('Job');
  Job.findByIdAndUpdate(id, {$inc: {progress: 1}}, {select: {progress:1}}, function(err, result){
    if (err) {
      callback('error');
    } else {
      callback('success', result.progress);
    }
  });
};

// list all jobs of a user
exports.list_user_jobs = function list_user_jobs(username, callback){
  var Job = mongoose.model('Job');
  Job.find({username: username}, function(err, results){
    if (err) {
      console.log(err);
      callback('error');
    } else {
      callback('success', results);
    }
  });
};
