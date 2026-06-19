package com.priyanshu.JobAppBackend.repo;

import com.priyanshu.JobAppBackend.model.JobPost;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
@Repository
public class JobRepo {
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
    public List<JobPost> getAllJobs(){

        return jobs;
    }
    public void addJob(JobPost jobPost){
        jobs.add(jobPost);
        System.out.println(jobs);
    }

    public JobPost getJob(int i) {
        for(JobPost job:jobs){
            if (job.getPid() == i) {
                return job;
            }
        }
        return null;
    }

    public void updateJob(JobPost jobpost) {
        for(JobPost job:jobs){
            if (job.getPid() == jobpost.getPid()) {
                job.setPostProfile(jobpost.getPostProfile());
                job.setPostDesc(jobpost.getPostDesc());
                job.setReqExpirience(jobpost.getReqExpirience());
                job.setPostTechStack(jobpost.getPostTechStack());
            }
        }
    }

    public void deleteJob(int id) {
            jobs.removeIf(job -> job.getPid() == id);
    }
}
