package com.priyanshu.JobAppBackend.service;

import com.priyanshu.JobAppBackend.model.JobPost;
import com.priyanshu.JobAppBackend.repo.JobRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {
    @Autowired
    JobRepo repo;

    public void addJob(JobPost jobPost){
        repo.addJob(jobPost);
    }
    public List<JobPost> getAllJobs(){
        return repo.getAllJobs();
    }

    public JobPost getJob(int i) {
        return repo.getJob(i);
    }

    public void updateJob(JobPost jobpost) {
        repo.updateJob(jobpost);
    }
}
