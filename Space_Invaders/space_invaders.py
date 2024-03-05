import pygame
from pygame import mixer
from pygame.locals import *
import random
import button

pygame.init()
mixer.init()

#Create the screen
SCREEN_WIDTH = 600
SCREEN_HEIGHT = 800

#Create the screen
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("Space Invaders")

#define colors
red = (255, 0, 0)
green = (0, 255, 0)
white = (255, 255, 255)

#defining fonts 
font30 = pygame.font.SysFont("Constantia", 30)
font40 = pygame.font.SysFont("Constantia", 40)

#Define game status
menu_state = "main"
GAMEPLAY_STATE = "gameplay"
PAUSE_STATE = "pause"
GAME_OVER_STATE = "game_over"


#initialize game state
current_state = menu_state

#define game variables 
rows = 5
cols = 5
game_over_timer = None
alien_cooldown = 1000 #milliseconds
last_alien_shot = pygame.time.get_ticks()
countdown = 3
last_count = pygame.time.get_ticks()
game_over = 0 #0 is no game over, 1 means player has won, =1 means player has lost
GAME_OVER_DELAY = 2000



#define fps
clock = pygame.time.Clock()
fps = 60

#load images
bg = pygame.image.load("Space_Invaders/images/background1.jpg").convert_alpha()
bg1 = pygame.image.load("Space_Invaders/images/background.jpg").convert_alpha()
start_img = pygame.image.load("Space_Invaders/images/start_btn.png").convert_alpha()
exit_img = pygame.image.load("Space_Invaders/images/exit_btn.png").convert_alpha()
restart_img = pygame.image.load("Space_Invaders/images/restart.png").convert_alpha()

#load sounds
explosion_fx = pygame.mixer.Sound("Space_Invaders/sounds/explosion.wav")
explosion_fx.set_volume(0.5)

explosion2_fx = pygame.mixer.Sound("Space_Invaders/sounds/fastinvader" + str(random.randint(1, 4))+ ".wav")
explosion2_fx.set_volume(0.5)

invader_killed_fx = pygame.mixer.Sound("Space_Invaders/sounds/invaderkilled.wav")
invader_killed_fx.set_volume(0.5)

bullet_sound = pygame.mixer.Sound("Space_Invaders/sounds/shoot.wav")
bullet_sound.set_volume(0.5)


#creating buttons instances
start_button = button.Button(200, 300, start_img, 0.5)
exit_button = button.Button(210, 400, exit_img, 0.5)
restart_button = button.Button(210, 300, restart_img, 0.5)

def draw_bg():
    screen.blit(bg, (0, 0))  

def draw_bg1():
        screen.blit(bg1, (0, 0))
    
#draw text function
def draw_text(text, font, text_col, x, y):
    img = font.render(text, True, text_col)
    screen.blit(img, (x, y))

def restart_game():
    #Clear all sprite groups
        bullet_group.empty()
        alien_group.empty()
        alien_bullet_group.empty()
        explosion_group.empty()
        create_aliens()
        pygame.mixer.music.play()
            
        #reset game variables
        game_over = 0
        countdown = 3
        last_count = pygame.time.get_ticks()
    
        #reset spaceship
        if len(spaceship_group) == 0:
            spaceship = Spaceship(int(SCREEN_WIDTH / 2), SCREEN_HEIGHT - 100, 3)
            spaceship_group.add(spaceship)
    
#Spaceship class
class Spaceship(pygame.sprite.Sprite):
    def __init__(self, x, y, health):
        pygame.sprite.Sprite.__init__(self)
        self.image = pygame.image.load("Space_Invaders/images/spaceship.png")
        self.rect = self.image.get_rect()
        self.rect.center = [x, y]
        self.health_start = health
        self.health_remaining = health   
        self.last_shot = pygame.time.get_ticks()     
        
    def update(self):
        #set movement speed
        speed = 5
        
        #set cooldown variable
        cooldown = 500 #milliseconds
        game_over = 0
        
        #get key presses
        key = pygame.key.get_pressed()
        if key[pygame.K_LEFT] and self.rect.left > 0:
            self.rect.x -= speed
        if key[pygame.K_RIGHT] and self.rect.right < SCREEN_WIDTH:
            self.rect.x += speed
        
        #record current time
        time_now = pygame.time.get_ticks()
            
        #shoot bullets
        if key[pygame.K_SPACE] and time_now - self.last_shot > cooldown:
            bullet_sound.play()
            bullet = Bullets(self.rect.centerx, self.rect.top)
            bullet_group.add(bullet)
            self.last_shot = time_now
            
        #update mask
        self.mask = pygame.mask.from_surface(self.image)
        
        #draw health bar
        pygame.draw.rect(screen, red, (self.rect.x, (self.rect.bottom + 10), self.rect.width, 15))
        if self.health_remaining > 0:
            pygame.draw.rect(screen, green, (self.rect.x, (self.rect.bottom + 10), int(self.rect.width * (self.health_remaining / self.health_start)), 15))  
        elif self.health_remaining <= 0:
            explosion = Explosion(self.rect.centerx, self.rect.centery, 3)
            explosion_group.add(explosion)
            self.kill()
            explosion_fx.play()
            game_over = -1
        return game_over
#create button class
class Bullets(pygame.sprite.Sprite):
    def __init__(self, x, y):
        pygame.sprite.Sprite.__init__(self)
        self.image = pygame.image.load("Space_Invaders/images/bullet.png")
        self.rect = self.image.get_rect()
        self.rect.center = [x, y]       
    
    def update(self):
        self.rect.y -= 5
        if self.rect.bottom <0:
            self.kill()
        if pygame.sprite.spritecollide(self, alien_group, True):
            self.kill()
            invader_killed_fx.play()
            explosion = Explosion(self.rect.centerx, self.rect.centery, 2)
            explosion_group.add(explosion)
        

#Alien class
class Aliens(pygame.sprite.Sprite):
    def __init__(self, x, y):
        pygame.sprite.Sprite.__init__(self)
        self.image = pygame.image.load("Space_Invaders/images/alien" + str(random.randint(1, 5)) + ".png")
        self.rect = self.image.get_rect()
        self.rect.center = [x, y]
        self.move_counter = 0
        self.move_direction = 1
    
    def update(self):
        self.rect.x += self.move_direction
        self.move_counter += 1
        if abs(self.move_counter) > 75:
            self.move_direction *= -1
            self.move_counter *= self.move_direction
    
#create alien bullet class
class Alien_Bullets(pygame.sprite.Sprite):
    def __init__(self, x, y):
        pygame.sprite.Sprite.__init__(self)
        self.image = pygame.image.load("Space_Invaders/images/alien_bullet.png")
        self.rect = self.image.get_rect()
        self.rect.center = [x, y]
    
    def update(self):
        self.rect.y += 2
        if self.rect.top > SCREEN_HEIGHT:
            self.kill()
        if pygame.sprite.spritecollide(self, spaceship_group, False, pygame.sprite.collide_mask):
            self.kill()
            explosion2_fx.play()
            #reduce spaceship health
            spaceship.health_remaining -= 1            
            explosion = Explosion(self.rect.centerx, self.rect.centery, 1)
            explosion_group.add(explosion)
#create explosion class
class Explosion(pygame.sprite.Sprite):
    def __init__(self, x, y, size):
        pygame.sprite.Sprite.__init__(self)
        self.images = []
        for num in range(1, 6):
            img = pygame.image.load(f"Space_Invaders/images/exp{num}.png")
            if size == 1:
                img = pygame.transform.scale(img, (20, 20))
            if size == 2:
                img = pygame.transform.scale(img, (40, 40))
            if size == 3:
                img = pygame.transform.scale(img, (160, 160))
            #add the image to the list
            self.images.append(img)
        self.index = 0
        self.image = self.images[self.index]
        self.rect = self.image.get_rect()
        self.rect.center = [x, y] 
        self.counter = 0  
    
    def update(self):
        explosion_speed = 3
        #update explosion animation
        self.counter += 1
        
        if self.counter >= explosion_speed and self.index < len(self.images) - 1:
            self.counter = 0
            self.index += 1
            self.image = self.images[self.index]
        #if the animation is complete, delete the explosion
        if self.index >= len(self.images) - 1 and self.counter >= explosion_speed:
            self.kill()
            
#create sprite groups
spaceship_group = pygame.sprite.Group()
bullet_group = pygame.sprite.Group()
alien_group = pygame.sprite.Group()
alien_bullet_group = pygame.sprite.Group()
explosion_group = pygame.sprite.Group()

def create_aliens():
    #generate aliens
    for row in range(rows):
        for item in range (cols):
            alien = Aliens( 100 + item * 100, 100 + row * 70)
            alien_group.add(alien)
create_aliens()


#create player
spaceship = Spaceship(int(SCREEN_WIDTH / 2), SCREEN_HEIGHT - 100, 3)  
spaceship_group.add(spaceship)

#game loop
paused = False
run = True
while run:    
    clock.tick(fps)       
    
    #Event Handling 
    for event in pygame.event.get():     
        if event.type == pygame.QUIT:
            run = False
        elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_ESCAPE:
                    if not paused:
                        paused = True
                        current_state = PAUSE_STATE                        
                    else:
                        paused = False
                        current_state = GAMEPLAY_STATE                        
        elif event.type == pygame.MOUSEBUTTONDOWN:
            if current_state == menu_state:
                #check if "Start" button is clicked
                if start_button.rect.collidepoint(event.pos):
                    current_state = GAMEPLAY_STATE  
            if current_state == GAME_OVER_STATE:
                if restart_button.rect.collidepoint(event.pos):
                    restart_game()
                    current_state = GAMEPLAY_STATE
                if exit_button.rect.collidepoint(event.pos):
                    run = False
        if game_over != 0:
            current_state = GAME_OVER_STATE 
    
    
    #Update game based on current state               
    if current_state == menu_state:
        
        #load music and play
        pygame.mixer.music.load("Space_Invaders/sounds/spaceinvaders1.mpeg")
        pygame.mixer.music.set_volume(0.5)
        pygame.mixer.music.play()
        
        #draw Background
        draw_bg()
            
        #draw buttons
        if start_button.draw(screen):
                current_state = GAMEPLAY_STATE
        if exit_button.draw(screen):
                run = False
                
    #PAUSE_STATE SECTION ON GAME LOOP
    elif current_state == PAUSE_STATE:
        
        draw_bg()   
        draw_text("PAUSED", font40, white, int(SCREEN_WIDTH / 2 - 100), int(SCREEN_HEIGHT / 2 - 170))   
            
        if restart_button.draw(screen):
            restart_game()            
            #reset current state to GAMEPLAY_STATE
            current_state = GAMEPLAY_STATE
        if exit_button.draw(screen):
            run = False

    #GAME_OVER_STATE SECTION ON GAME LOOP            
    elif current_state == GAME_OVER_STATE:
        
        draw_bg()   
        draw_text("GAME OVER!", font40, white, int(SCREEN_WIDTH / 2 - 130), int(SCREEN_HEIGHT / 2 - 170))   
            
                    
        if restart_button.draw(screen):
            restart_game()            
            #reset current state to GAMEPLAY_STATE
            current_state = GAMEPLAY_STATE
            
        if exit_button.draw(screen):
            run = False 
                
    elif current_state == GAMEPLAY_STATE:      
        
        #draw background
        draw_bg1()
        
        if countdown > 0:
            draw_text("GET READY!", font40, white, int(SCREEN_WIDTH / 2 - 110), int(SCREEN_HEIGHT / 2 + 50))
            draw_text(str(countdown), font40, white, int(SCREEN_WIDTH / 2 - 10), int(SCREEN_HEIGHT / 2 + 100)) 
            count_timer = pygame.time.get_ticks()
            if count_timer - last_count > 1000:
                countdown -= 1
                last_count = count_timer        
        else:
            if countdown == 0:
                #Create Random Alien Bullets
                #record current time
                time_now = pygame.time.get_ticks()    
                #shoot bullets
                if time_now - last_alien_shot > alien_cooldown and len(alien_bullet_group) < 5 and len(alien_group) > 0:
                    attacking_alien = random.choice(alien_group.sprites())
                    alien_bullet = Alien_Bullets(attacking_alien.rect.centerx, attacking_alien.rect.bottom)
                    alien_bullet_group.add(alien_bullet)
                    last_alien_shot = time_now
        
                #check if all aliens have been killed
                if len(alien_group) == 0:
                    game_over = 1
                
                if game_over == 0:                
                    #update spaceship
                    game_over = spaceship.update()
            
                    #update sprite groups
                    bullet_group.update()
                    alien_group.update()
                    alien_bullet_group.update()
                    
                else:
                    if game_over == -1:
                        if game_over_timer == None:
                            game_over_timer = pygame.time.get_ticks()
                        elif pygame.time.get_ticks() - game_over_timer < GAME_OVER_DELAY:
                            pygame.mixer.music.fadeout(2000)
                        if game_over == 1:
                            game_over_timer = pygame.time.get_ticks()
                        elif pygame.time.get_ticks() - game_over_timer < GAME_OVER_DELAY:
                            pygame.mixer.music.fadeout(3000)
                            draw_text("YOU WIN!", font40, white, int(SCREEN_WIDTH / 2 - 100), int(SCREEN_HEIGHT / 2 + 50))         
        #update explosion group
        explosion_group.update()
                
        #draw sprite groups
        spaceship_group.draw(screen)
        bullet_group.draw(screen)
        alien_group.draw(screen)
        alien_bullet_group.draw(screen)
        explosion_group.draw(screen)            
            
    pygame.display.update()

pygame.quit()