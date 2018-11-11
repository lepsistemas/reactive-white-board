package br.com.lepsistemas.reactivewhiteboard.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class DrawingController {

    @MessageMapping("/drawings")
    @SendTo("/topic/drawings")
    public DrawingDTO drawing(DrawingDTO drawingDTO) {
        return drawingDTO;
    }
}
