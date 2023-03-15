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
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Date;

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
                .build();
        for (Comment comment : post.getComments()) {
            CommentDto commentDto = CommentDto.builder()
                    .postId(comment.getPost().getId())
                    .userEmail(comment.getUser().getEmail())
                    .userFirstName(comment.getUser().getFirstName())
                    .userLastName(comment.getUser().getLastName())
                    .likes(comment.getLikes())
                    .id(comment.getId()).build();
            postDto.getComments().add(commentDto);
        }
        return postDto;
    }

    public void addPost(PostDto postDto) {
        User author = userRepository.findByEmail(postDto.getAuthorEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found"));
        Post post = Post
                .builder()
                .content(postDto.getContent())
                .publishedDate(new Date())
                .title(postDto.getTitle())
                .likes(0)
                .tags(postDto.getTags())
                .author(author)
                .build();
        postRepository.saveAndFlush(post);
    }
}
