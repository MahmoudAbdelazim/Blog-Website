package com.blog.payload;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CommentDto {
    private Long id;
    private String userFirstName;
    private String userLastName;
    private String userEmail;
    private Long postId;
    private Integer likes = 0;
}
