package main

import (
	"context"
	"fmt"
	"os"

	"runtime"

	"github.com/shirou/gopsutil/disk"
	wailsRuntime "github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx context.Context
}

type FileType string

const (
	Drive   FileType = "Drive"
	Folder  FileType = "Folder"
	File    FileType = "File"
	Network FileType = "Network"
)

type Directory struct {
	Name string   `json:"name"`
	Path string   `json:"path"`
	Type FileType `json:"type"`
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greDreting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) GetHome() []Directory {
	if a.GetOS() == "windows" {
		drives := a.GetDrives()
		if drives == nil {
			return []Directory{}
		}
		var directories []Directory
		for _, drive := range drives {
			directories = append(directories, Directory{
				Name: drive.Device,
				Path: drive.Mountpoint,
				Type: Folder,
			})
		}
		return directories
	} else {
		file, err := os.Open("/home/") // For Unix systems
		if err != nil {
			EmitError(err, a.ctx)
			return []Directory{}
		}
		defer file.Close()
		dirs, _ := file.ReadDir(0) // 0 to read all files and folders
		var directories []Directory
		for _, dir := range dirs {
			fmt.Println("Directories: ", file.Name())
			fmt.Println(dir.Info())
			directories = append(directories, Directory{
				Name: dir.Name(),
				Path: file.Name() + dir.Name(),
				Type: Folder,
			})
		}
		return directories
	}
}

func (a *App) Test() int {
	var test = 123
	return test
}

func (a *App) GetOS() string {
	return runtime.GOOS

}

func (a *App) GetDrives() []disk.PartitionStat {
	if a.GetOS() == "windows" {
		partitions, err := disk.Partitions(true)

		if err != nil {
			fmt.Println("Error: ", err)
		}

		return partitions
	} else {
		return nil
	}
}

func EmitError(err error, ctx context.Context) {
	if err != nil {
		fmt.Println("Error: ", err)
		wailsRuntime.EventsEmit(ctx, "errorEmit", err)
	}

}

func (a *App) GetFolders(directory string) []string {
	file, err := os.Open(directory)
	if err != nil {
		EmitError(err, a.ctx)
		return []string{"Error: ", err.Error()}
	}
	defer file.Close()
	dirs, _ := file.Readdirnames(0) // 0 to read all files and folders
	return dirs
}
