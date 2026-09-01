package com.priyanshu.JobAppBackend.service;

import com.priyanshu.JobAppBackend.model.JobPost;
import com.priyanshu.JobAppBackend.repo.JobRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class JobService {

    @Autowired
    JobRepo repo;

//    public void addJob(JobPost jobPost){
//        repo.addJob(jobPost);
//    }
    public void addJob(JobPost job) {
        repo.save(job);
    }

//    public List<JobPost> getAllJobs(){
//        return repo.getAllJobs();
//    }
    public List<JobPost> getAllJobs() {
        return repo.findAll();
    }

//    public JobPost getJob(int i) {
//        return repo.getJob(i);
//    }
    public JobPost getJobById(int id) {
        return repo.findById(id).get();
    }
//    public void updateJob(JobPost jobpost) {
//        repo.updateJob(jobpost);
//    }
    public void updateJob(JobPost job) {
        repo.save(job);
    }
//    public void deleteJob(int id) {
//        repo.deleteJob(id);
//    }
    public void deleteJob(int i){
        repo.deleteById(i);
    }
    public List<JobPost> load(){
        List<JobPost> jobs = new ArrayList<>(Arrays.asList(
                new JobPost(
                        1,
                        "Java Developer",
                        "Develop and maintain Spring Boot applications",
                        2,
                        Arrays.asList("Java", "Spring Boot", "MySQL", "Git")
                ),

                new JobPost(
                        2,
                        "Frontend Developer",
                        "Build responsive user interfaces",
                        1,
                        Arrays.asList("HTML", "CSS", "JavaScript", "React")
                ),

                new JobPost(
                        3,
                        "Full Stack Developer",
                        "Work on both frontend and backend systems",
                        3,
                        Arrays.asList("Java", "Spring Boot", "React", "MongoDB")
                ),

                new JobPost(
                        4,
                        "DevOps Engineer",
                        "Manage CI/CD pipelines and cloud infrastructure",
                        4,
                        Arrays.asList("Docker", "Kubernetes", "AWS", "Jenkins")
                ),

                new JobPost(
                        5,
                        "AI/ML Engineer",
                        "Develop and deploy machine learning models",
                        2,
                        Arrays.asList("Python", "TensorFlow", "PyTorch", "Pandas")
                )
        )
        );
        repo.saveAll(jobs);
        return repo.findAll();
    }
}
