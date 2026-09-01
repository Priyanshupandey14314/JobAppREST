package com.priyanshu.JobAppBackend;

import com.priyanshu.JobAppBackend.model.JobPost;
import com.priyanshu.JobAppBackend.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

//@Controller //When we use controller its expects a view name like jsp
//When we want to use json data we have to specify it in response body.
//@ResponseBody
// Instead of using these two we can use only one named @RestController
@RestController
@CrossOrigin(origins = "http://localhost:5174/")
public class JobAppRestController {
    @Autowired
    private JobService jobservice;
    @GetMapping("jobPosts")
    public List<JobPost> getAllJobs(){
        return jobservice.getAllJobs();
    }
    @GetMapping("jobPosts/{postId}")
    public JobPost getJobById(@PathVariable("postId") int postId){
        return jobservice.getJobById(postId);
    }

    @PostMapping("jobPost")
    public void addJob(@RequestBody JobPost jobpost){
        jobservice.addJob(jobpost);
    }

    @PutMapping("jobPost")
    public JobPost updateJob(@RequestBody JobPost jobpost){
        jobservice.updateJob(jobpost);
        return jobservice.getJobById(jobpost.getPid());
    }

    @DeleteMapping("jobPost/{pid}")
    public String deleteJob(@PathVariable int pid){
        jobservice.deleteJob(pid);
        return "Deleted";
    }
    @GetMapping("jobPost/load")
    public List<JobPost> loadAllJobs(){
        return jobservice.load();
    }
}
