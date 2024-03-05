import pygame
import random
import time
import button


pygame.init()



#Screen dimensions
SCREEN_WIDTH = 800
SCREEN_HEIGHT = 600

#screen setup
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("Typing Speed Test")

#Define colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)

#Define Game states
MENU_STATE = "MENU"
GAME_STATE = "GAME"

#Initalize game state
current_state = MENU_STATE

#define fonts
font_path = pygame.font.match_font('arial')
font_size = 32
font = pygame.font.Font(font_path, font_size)

class Word:
    def __init__(self, text, x, y):
        self.text = text
        self.x = x
        self.y = y
        self.color = WHITE

    def draw(self, surface):
        text_render = font.render(self.text, True, self.color)
        surface.blit(text_render, (self.x, self.y))

#load images
start_img = pygame.image.load('Typing_Speed_Test/images/start_btn.png')
options_img = pygame.image.load('Typing_Speed_Test/images/options_btn.png')
exit_img = pygame.image.load('Typing_Speed_Test/images/exit_btn.png')


#creating buttons in game
button_scale = 0.5
button_spacing = 20
start_button = button.Button(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2 - start_img.get_height() * button_scale - button_spacing, start_img, button_scale)
options_button = button.Button(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2, options_img, button_scale)
exit_button = button.Button(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2 + exit_img.get_height() * button_scale + button_spacing, exit_img, button_scale)

#Typing variables
typing_text = "The quick brown fox jumps over the lazy dog."
user_input = ""
font = pygame.font.Font(None, 32)


        
# Game loop
run = True
while run:
    
    screen.fill(BLACK)
    
    #event handler
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            run = False
            pygame.quit()
        
    if current_state == MENU_STATE:
        if start_button.draw(screen):
            current_state = GAME_STATE
            start_time = time.time()
            word  = Word("The quick brown fox jumps over the lazy dog.", 100, 100)
        if options_button.draw(screen):
            print("Options button clicked")
        if exit_button.draw(screen):
            run = False
            pygame.quit()
            
    elif current_state == GAME_STATE:
        word.draw(screen)
            
        #Get User Input
        user_input = ""
        for event in pygame.event.get():
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_RETURN:
                    #Check if user input matches the wor
                    end_time = time.time()
                    elapsed_time = end_time - start_time
                    words_per_minute = len(word.text.split()) / (elapsed_time / 60)
                    accuracy = sum(a == b for a, b in zip(word.text.split(), user_input.split())) / len(word.text.split()) * 100
                    
                    #print feedback
                    print(f"Words per minute: {words_per_minute:.2f}")
                    print(f"Accuracy: {accuracy:.2f}%")
                    
                    current_state = MENU_STATE
                    break
                elif event.key == pygame.K_BACKSPACE:
                    user_input = user_input[:-1]
                else:
                    user_input += event.unicode
                    
        #Render user input
        user_input_render = font.render(user_input, True, WHITE)
        screen.blit(user_input_render, (word.x, word.y + 50))
    
    pygame.display.update()
