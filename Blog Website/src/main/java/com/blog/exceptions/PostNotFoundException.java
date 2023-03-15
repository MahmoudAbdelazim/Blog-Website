package com.blog.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

public class PostNotFoundException extends Throwable {
    @Override
    public String getMessage() {
        return "Post Not Found";
    }
}
