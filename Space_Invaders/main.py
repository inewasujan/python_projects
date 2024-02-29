import pygame
from pygame.locals import *
import button

pygame.init()

#define fps
clock = pygame.time.Clock()
fps = 60

#Create the screen
SCREEN_WIDTH = 800
SCREEN_HEIGHT = 600

screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("Space Invaders")

#game variables 
game_paused = False
menu_state = "main"

#defining fonts 
font = pygame.font.SysFont("arialblack", 40)

#defining colors
TEXT_COL = (255, 255, 255)

#loadbutton images
bg = pygame.image.load("images/background.jpg").convert_alpha()
start_img = pygame.image.load("images/start_btn.png").convert_alpha()
exit_img = pygame.image.load("images/exit_btn.png").convert_alpha()

#creating buttons instances
start_button = button.Button(300, 200, start_img, 0.5)
exit_button = button.Button(300, 300, exit_img, 0.5)

def draw_bg():
    screen.blit(bg, (0, 0))  

#Spaceship class
class Spaceship(pygame.sprite.Sprite):
    def __init__(self, x, y):
        pygame.sprite.Sprite.__init__(self)
        self.image = pygame.image.load("images/spaceship.png").convert_alpha()
        self.rect = self.image.get_rect()
        self.rect.center = [x, y]
        self.speed = 5
        
    def update(self):
        #get key presses
        key = pygame.key.get_pressed()
        if key[pygame.K_LEFT]:
            self.rect.x -= self.speed
        if key[pygame.K_RIGHT]:
            self.rect.x += self.speed
        #screen boundaries
        if self.rect.right > SCREEN_WIDTH:
            self.rect.right = SCREEN_WIDTH
        if self.rect.left < 0:
            self.rect.left = 0
            
#create sprite groups
spaceship_group = pygame.sprite.Group()
#create player
spaceship = Spaceship(int(SCREEN_WIDTH / 2), SCREEN_HEIGHT - 100)  
spaceship_group.add(spaceship)

#draw text function
def draw_text(text, font, text_col, x, y):
    img = font.render(text, True, text_col)
    screen.blit(img, (x, y))

#game loop
run = True
while run:    
    clock.tick(fps)
    
    #draw Background
    draw_bg()
    
    #Event Handling
    for event in pygame.event.get():     
        if event.type == pygame.QUIT:
            run = False
        elif event.type == pygame.MOUSEBUTTONDOWN:
            if menu_state == "main":
                #check if "Start" button is clicked
                if start_button.rect.collidepoint(event.pos):
                    menu_state = "game"
    
    #Update game based on menu state                
    if menu_state == "main":
        #Display menu screen
            #draw buttons
            if start_button.draw(screen):
                game_paused = False
            if exit_button.draw(screen):
                run = False
    elif menu_state == "game":
        for event in pygame.event.get():
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_SPACE:
                    print("Space key pressed")
                    game_paused = not game_paused #toggle pause
        
        if not game_paused:
            #update spaceship
            spaceship.update()
    
            #draw sprite groups
            spaceship_group.draw(screen)

    
    pygame.display.update()

pygame.quit()