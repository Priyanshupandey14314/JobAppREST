package com.priyanshu.JobAppBackend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobPost {
    @Id
    private int pid;
    private String postProfile;
    private String postDesc;
    private int ReqExpirience;
    private List<String> postTechStack;
}
