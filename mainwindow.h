#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include "renderarea.h"

namespace Ui {
class MainWindow;
}

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
    void brushChanged();

private:
    Ui::MainWindow *ui;
    RenderArea *renderArea;
};

#endif // MAINWINDOW_H
