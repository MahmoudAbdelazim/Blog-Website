package com.blog.services;

import com.blog.exceptions.PostNotFoundException;
import com.blog.models.Comment;
import com.blog.models.Post;
import com.blog.models.User;
import com.blog.payload.CommentDto;
import com.blog.payload.PostDto;
import com.blog.repositories.PostRepository;
import com.blog.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public PostDto getPost(Long id) throws PostNotFoundException {
        Post post = postRepository.findById(id)
                .orElseThrow(PostNotFoundException::new);
        PostDto postDto = PostDto
                .builder()
                .authorFirstName(post.getAuthor().getFirstName())
                .authorLastName(post.getAuthor().getLastName())
                .authorEmail(post.getAuthor().getEmail())
                .content(post.getContent())
                .title(post.getTitle())
                .likes(post.getLikes())
                .publishedDate(post.getPublishedDate())
                .id(post.getId())
                .tags(post.getTags())
                .comments(new ArrayList<>())
                .build();
        for (Comment comment : post.getComments()) {
            CommentDto commentDto = CommentDto.builder()
                    .postId(comment.getPost().getId())
                    .userEmail(comment.getUser().getEmail())
                    .userFirstName(comment.getUser().getFirstName())
                    .userLastName(comment.getUser().getLastName())
                    .likes(comment.getLikes())
                    .comment(comment.getComment())
                    .date(comment.getDate())
                    .id(comment.getId()).build();
            postDto.getComments().add(commentDto);
        }
        return postDto;
    }

    public void addPost(User user, PostDto postDto) {
        Post post = Post
                .builder()
                .content(postDto.getContent())
                .publishedDate(new Date())
                .title(postDto.getTitle())
                .likes(0)
                .tags(postDto.getTags())
                .author(user)
                .build();
        postRepository.saveAndFlush(post);
    }

    public List<PostDto> getPosts() {
        List<Post> posts = postRepository.findAllByOrderByPublishedDateDesc();
        List<PostDto> postDtos = new ArrayList<>();
        for (Post post: posts) {
            PostDto postDto = PostDto.builder()
                    .content(post.getContent())
                    .publishedDate(post.getPublishedDate())
                    .title(post.getTitle())
                    .authorEmail(post.getAuthor().getEmail())
                    .authorFirstName(post.getAuthor().getFirstName())
                    .authorLastName(post.getAuthor().getLastName())
                    .likes(post.getLikes())
                    .tags(post.getTags())
                    .id(post.getId())
                    .build();
            List<CommentDto> commentDtos = new ArrayList<>();
            for (Comment comment: post.getComments()) {
                CommentDto commentDto = CommentDto.builder()
                        .userEmail(comment.getUser().getEmail())
                        .userFirstName(comment.getUser().getFirstName())
                        .userLastName(comment.getUser().getLastName())
                        .likes(comment.getLikes())
                        .id(comment.getId())
                        .postId(comment.getPost().getId())
                        .comment(comment.getComment())
                        .date(comment.getDate())
                        .build();
                commentDtos.add(commentDto);
            }
            postDto.setComments(commentDtos);
            postDtos.add(postDto);
        }
        return postDtos;
    }
}
