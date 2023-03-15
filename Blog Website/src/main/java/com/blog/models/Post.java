package com.blog.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;
    private String title;
    private String content;
    private Date publishedDate;
    private Integer likes = 0;
    @ManyToOne
    @JoinColumn(name = "author_id")
    private User author;
    @OneToMany
    private List<Comment> comments = new ArrayList<>();
    @ManyToMany
    private List<Tag> tags = new ArrayList<>();
}
