#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QListWidget>
#include <QMainWindow>
#include "renderarea.h"
#include "layerslistmodel.h"

namespace Ui {
class MainWindow;
}

enum CommandState {
    MovingTool,
    SelectionTool,
    RectangleTool,
    ImageTool,
    PenTool,
    TextTool
};

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit MainWindow(QWidget *parent = nullptr);
    ~MainWindow();

private slots:
    void text_button_pressed();
    void move_button_pressed();
    void select_button_pressed();
    void rectangle_button_pressed();
    void image_button_pressed();
    void shapeChanged();
    void penChanged();
    void add_layer_pressed();
    void brushChanged();
    void delete_layer_button();
    void layer_clicked();
    void about_clicked();

private:
    Ui::MainWindow *ui;
    RenderArea *renderArea;
    CommandState commandState;
    void setupUI();
    int layer_count;
    LayersListModel* model;
};

#endif // MAINWINDOW_H
