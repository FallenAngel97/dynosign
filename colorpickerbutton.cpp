#include "colorpickerbutton.h"

#include <QColorDialog>
#include <QPainter>
#include <QVBoxLayout>
#include <QDebug>
#include <QMouseEvent>

ColorPickerButton::ColorPickerButton(QWidget *parent):QFrame(parent)
{
//    backgroundButton = new QPushButton(this);
//    QPixmap pixmap(":/images/color_selector.svg");
//    QIcon backgroundButtonIcon(pixmap);
//    backgroundButton->setIcon(backgroundButtonIcon);
//    QVBoxLayout *base_layout = new QVBoxLayout(this);
//    base_layout->addWidget(backgroundButton);
//    setLayout(base_layout);
    borderColor.setNamedColor("#ccc");
    fillColor.setNamedColor("#ccc");
}

void ColorPickerButton::paintEvent(QPaintEvent *event)
{
    margin = 3;
    height = 30;
    QPainter painter(this);
    painter.setRenderHint(QPainter::Antialiasing);
    painter.setPen(Qt::NoPen);
    QPainterPath path;
    path.addRoundedRect(QRectF(margin + height/4,margin + height/4, 15, 15), 10, 10);
    QPainterPath borderPath;
    borderPath.addRoundRect(QRectF(margin,margin,height, height), 10,10);
    painter.fillPath(path,fillColor);
    painter.drawPath(path);
    QPen pen(borderColor, 6, Qt::SolidLine, Qt::RoundCap, Qt::RoundJoin);
    painter.setPen(pen);
    painter.drawPath(borderPath);
}

void ColorPickerButton::mouseReleaseEvent(QMouseEvent *event)
{
    QColorDialog dialog(this);
    int x_pressed = event->pos().x();
    int y_pressed = event->pos().y();
    qDebug() << event->pos();
    if( x_pressed<6 || y_pressed<6 || x_pressed>height || y_pressed>height ) {
        borderColor = dialog.getColor();
    } else if (x_pressed>11 && x_pressed < 25 && y_pressed>11 && y_pressed < 25) {
        fillColor = dialog.getColor();
    }
    update();
}

QSize ColorPickerButton::sizeHint() const
{
    return QSize(36,36);
}

QSize ColorPickerButton::minimumSizeHint() const
{
    return QSize(36,36);
}
