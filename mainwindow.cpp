#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <QColorDialog>
#include "colorpickerbutton.h"
#include <QtDebug>
#include <QFileDialog>

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);
    ui->centralWidget->layout()->setContentsMargins(0,0,0,0);
    ui->left_panel->setAlignment(Qt::AlignTop);
    ui->right_panel->setAlignment(Qt::AlignTop);
    ui->text_button->setProperty("class", "left_panel_actionbuttons");
    ui->move_button->setProperty("class", "left_panel_actionbuttons");
    ui->rect_button->setProperty("class", "left_panel_actionbuttons");
    ui->text_button->setProperty("class", "left_panel_actionbuttons");
    ui->image_button->setProperty("class", "left_panel_actionbuttons");
    ui->select_button->setProperty("class", "left_panel_actionbuttons");
    connect(ui->text_button, SIGNAL(released()), this, SLOT(text_button_pressed()));
    connect(ui->move_button, SIGNAL(released()), this, SLOT(move_button_pressed()));
    connect(ui->select_button, SIGNAL(released()), this, SLOT(select_button_pressed()));
    connect(ui->rect_button, SIGNAL(released()), this, SLOT(rectangle_button_pressed()));
    connect(ui->image_button, SIGNAL(released()), this, SLOT(image_button_pressed()));
    renderArea = new RenderArea;
    QVBoxLayout *draw_tab_layout = new QVBoxLayout;
    draw_tab_layout->addWidget(renderArea);
    ui->tab->setLayout(draw_tab_layout);
}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::text_button_pressed()
{
    QApplication::setOverrideCursor(Qt::IBeamCursor);
}

void MainWindow::move_button_pressed()
{
    QApplication::restoreOverrideCursor();
}

void MainWindow::select_button_pressed()
{
    QApplication::setOverrideCursor(Qt::CrossCursor);
}

void MainWindow::rectangle_button_pressed()
{
    QApplication::setOverrideCursor(Qt::CrossCursor);
}

void MainWindow::image_button_pressed()
{
    QString filename = QFileDialog::getOpenFileName(
            this,
            tr("Open Image"),
            QDir::currentPath(),
            tr("Images (*.png *.jpg *.jpeg *.svg)") );
}

void MainWindow::shapeChanged()
{

}

void MainWindow::penChanged()
{

}

void MainWindow::brushChanged()
{

}
