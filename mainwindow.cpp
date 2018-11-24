#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <QColorDialog>
#include "colorpickerbutton.h"
#include <QFileDialog>
#include <QList>
#include <QDebug>
#include <QString>
#include <QMessageBox>
#include "layer.h"

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    setupUI();
    connect(ui->text_button, SIGNAL(released()), this, SLOT(text_button_pressed()));
    connect(ui->move_button, SIGNAL(released()), this, SLOT(move_button_pressed()));
    connect(ui->select_button, SIGNAL(released()), this, SLOT(select_button_pressed()));
    connect(ui->rect_button, SIGNAL(released()), this, SLOT(rectangle_button_pressed()));
    connect(ui->image_button, SIGNAL(released()), this, SLOT(image_button_pressed()));
    connect(ui->delete_layer_button, SIGNAL(released()), this, SLOT(delete_layer_button()));
    connect(ui->add_layer_button, SIGNAL(released()), this, SLOT(add_layer_pressed()));
    connect(ui->layers_list, SIGNAL(itemClicked(QListWidgetItem *)), this, SLOT(layer_clicked(QListWidgetItem *)));
    connect(ui->actionAbout, SIGNAL(released()), this, SLOT(about_clicked()));
}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::text_button_pressed()
{
    QApplication::setOverrideCursor(Qt::IBeamCursor);
    commandState = CommandState::TextTool;
}

void MainWindow::move_button_pressed()
{
    QApplication::restoreOverrideCursor();
    commandState = CommandState::MovingTool;
}

void MainWindow::select_button_pressed()
{
    QApplication::setOverrideCursor(Qt::CrossCursor);
    commandState = CommandState::SelectionTool;
}

void MainWindow::rectangle_button_pressed()
{
    QApplication::setOverrideCursor(Qt::CrossCursor);
    commandState = CommandState::RectangleTool;
}

void MainWindow::image_button_pressed()
{
    QString filename = QFileDialog::getOpenFileName(
            this,
            tr("Open Image"),
            QDir::currentPath(),
            tr("Images (*.png *.jpg *.jpeg *.svg)") );
    commandState = CommandState::ImageTool;
}

void MainWindow::shapeChanged()
{

}

void MainWindow::penChanged()
{

}

void MainWindow::add_layer_pressed()
{
    model->addLayer(new Layer(QString("Layer %1").arg(++layer_count), this));
}

void MainWindow::brushChanged()
{

}

void MainWindow::delete_layer_button()
{
    int index = ui->layers_list->currentIndex().row();
    model->removeLayer(index);
//    qDebug() << item;
//    if(item.count()<1)
//        return;
//    delete ui->layers_list->takeItem(ui->layers_list->row(item.first()));
//    ui->layers_list->update();
}

void MainWindow::layer_clicked(QListWidgetItem  *item)
{
    ui->opacity_slider->setEnabled(true);
}

void MainWindow::about_clicked()
{
    QMessageBox msgBox;
    msgBox.setText("Dynosign\nAlpha version");
    msgBox.exec();
}

void MainWindow::setupUI()
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
    renderArea = new RenderArea;
    QVBoxLayout *draw_tab_layout = new QVBoxLayout;
    draw_tab_layout->addWidget(renderArea);
    ui->tab->setLayout(draw_tab_layout);
    ui->select_button->setProperty("class", "left_panel_actionbuttons");
    ui->layers_list->setFixedWidth(140);
    commandState = CommandState::MovingTool;
    layer_count = 0;
    std::vector<Layer*> layers = {new Layer("background", this)};
    model = new LayersListModel(layers, this);
    ui->layers_list->setModel(model);
    ui->layers_list->show();
}
