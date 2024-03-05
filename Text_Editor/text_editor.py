import tkinter as tk
from tkinter import ttk
from tkinter import filedialog
from tkinter import messagebox
import os

class TextEditor:
    def __init__(self):
        self.window = tk.Tk()
        self.window.title("Text Editor")
        
        self.notebook = ttk.Notebook(self.window)
        self.notebook.pack(expand=tk.YES, fill=tk.BOTH)        
        
        self.text_editors = {}        #Dictionary to store text editors and their content
        
        self.create_menu()
        
        # Create a new tab with a text area
        self.new_file()
        
        self.window.bind("<Escape>", self.close_tab) #Bind the <Escape> key to close the current tab
        
        self.window.mainloop()
        
    def create_menu(self):
        menu = tk.Menu(self.window)
        self.window.config(menu=menu)
        
        # Create File Menu and use tearoff=off to remove dashed line
        file_menu = tk.Menu(menu, tearoff="off")
        menu.add_cascade(label="File", menu=file_menu)
        file_menu.add_command(label="New", command=self.new_file)
        file_menu.add_command(label="Open", command=self.open_file)
        file_menu.add_command(label="Save", command=self.save_file)
        file_menu.add_separator()
        file_menu.add_command(label="Rename", command=self.rename_tab)
        file_menu.add_separator()
        file_menu.add_command(label="Exit", command=self.window.quit)
    
    def new_file(self):
        tab = tk.Frame(self.notebook)
        text_area = tk.Text(tab, wrap=tk.WORD)
        text_area.pack(expand=tk.YES, fill=tk.BOTH)
        self.notebook.add(tab, text="New")
        
        # Store reference to the text area in the tab
        self.text_editors[tab] = text_area
        
        #Bind the <NotebookTabChanged> event to update the cache when switching tabs
        self.notebook.bind("<ButtonRelease-1>", self.update_cache)
    
    def update_cache(self, event):
        current_tab_index = self.notebook.index(self.notebook.select())
        current_tab = self.notebook,select()
        current_text_area = self.notebook.nametowidget[current_tab]
        
        #update the cache with the current data in the text editor
        self.text_editors[current_tab] = current_text_area.get(1.0, tk.END)
        

    def open_file(self):
        file_path = filedialog.askopenfilename(defaultextension=".txt", filetypes=[("Text Files", "*.txt"), ("All Files", "*.*")])
        if file_path:
            try:
                with open(file_path, "r") as file:
                    content = file.read()
                    
                if not hasattr(self, "initial_empty_tab_created"):
                    initial_tab = self.notebook.winfo_children()[0]
                    initial_text_area = self.text_editors[initial_tab]
                    
                    #check if the initial tab is empty or has been modified
                    if initial_text_area.edit_modified() or initial_text_area.get(1.0, tk.END) != "\n":
                        # if the initial tab has been modified, create a new tab
                        self.initial_empty_tab_created = True
                    else:
                        # if the initial tab is empty, remove it
                        self.notebook.forget(initial_tab)
                        del self.text_editors[initial_tab]
                        self.initial_empty_tab_created = True                    
                    
                    tab = tk.Frame(self.notebook)
                    text_area = tk.Text(tab, wrap=tk.WORD)
                    text_area.pack(expand=tk.YES, fill=tk.BOTH)
                    
                    filename, _ = os.path.splitext(os.path.basename(file_path))                    
                    self.notebook.add(tab, text=filename)
                    self.notebook.select(tab)
                    
                    # Store reference to the text area in the tab
                    self.text_editors[tab] = text_area
                    
                    #bind the <NotebookTabChanged> event to update the cache when switching tabs
                    self.notebook.bind("<ButtonRelease-1>", self.update_cache)                                       
                    self.window.title(f"Text Editor - {file_path}")
            except Exception as e:
                messagebox.showerror("Error", f"Failed to open file: {e}")
                
    def save_file(self):
            current_tab_index = self.notebook.index(self.notebook.select())
            current_tab = self.notebook.winfo_children()[current_tab_index]
            current_text_area = self.text_editors[current_tab]
            
            file_path = filedialog.asksaveasfilename(defaultextension=".txt", filetypes=[("Text Files", "*.txt"), ("All Files", "*.*")])
            if file_path:
                try:
                    with open(file_path, "w", encoding="utf-8") as file_handler:
                        content = current_text_area.get(1.0, tk.END)
                        file_handler.write(content)
                        self.window.title(f"Text Editor - {file_path}")
                        messagebox.showinfo("Success", "File saved successfully")
                except Exception as e:
                    messagebox.showerror("Error", f"Failed to save file: {e}")
    
    def close_tab(self, event):
        current_tab_index = self.notebook.index(self.notebook.select())
        if current_tab_index != -1:
            self.notebook.forget(current_tab_index)
    
    def rename_tab(self):
        current_tab_index = self.notebook.index(self.notebook.select())
        current_tab = self.notebook.winfo_children()[current_tab_index]
        new_name = tk.simpledialog.askstring("Rename Tab", "Enter new file name:")
        if new_name:
            self.notebook.tab(current_tab, text=new_name)
                    
                    
if __name__ =="__main__":
    text_editor = TextEditor()
    