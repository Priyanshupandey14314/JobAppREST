package com.priyanshu.JobAppBackend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Component
public class JobPost {
    private int pid;
    private String postProfile;
    private String postDesc;
    private int ReqExpirience;
    private List<String> postTechStack;
}
