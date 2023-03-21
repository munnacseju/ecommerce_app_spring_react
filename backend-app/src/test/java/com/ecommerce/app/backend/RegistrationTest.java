package com.ecommerce.app.backend;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.LinkedHashMap;
import java.util.Map;

import org.apache.http.HttpStatus;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class RegistrationTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void testRegistration() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, String> requestBody = new LinkedHashMap<>();
        requestBody.put("userName", "hello1111");
        requestBody.put("password", "hello");
        requestBody.put("firstName", "First Name");
        requestBody.put("secondName", "Second Name");

        HttpEntity<Map<String, String>> entity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<String> response = restTemplate.postForEntity("/api/v1/register", entity, String.class);

        assertThat(response.getStatusCodeValue()).isEqualTo(HttpStatus.SC_OK);
        assertThat(response.getBody()).contains("Successfully registered!");
    }
}
