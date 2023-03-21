package com.ecommerce.app.backend;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.LinkedHashMap;
import java.util.Map;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class AddProductTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void addProductTest() {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("productName", "Sample Product");
        body.put("qty", 10);
        body.put("price", 100);
        body.put("description", "This is a sample product description.");
        body.put("imageBase64", "dummy...");

        // Create the headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth("eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJTcHJpbmctU2VjdXJpdHktQXBwIiwic3ViIjoiaGVsbG8iLCJpYXQiOjE2Nzk0MjUwMDEsImV4cCI6MTY3OTc4NTAwMX0.b-lobtMfXLldfpLpBsBa7EQAe3OSH9v21PgN3dE_yTk");

        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        ResponseEntity<String> responseEntity = restTemplate.postForEntity("/api/addProduct", requestEntity, String.class);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());

        String responseBody = responseEntity.getBody();
    }
}
