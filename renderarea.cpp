#include "renderarea.h"
#include <QPainter>
RenderArea::RenderArea(QWidget *parent) : QWidget(parent)
{
    shape = Polygon;
    antialised = false;
    transformed = false;
    pixmap.load(":/images/image.svg");

    setBackgroundRole(QPalette::Base);
    setAutoFillBackground(true);
}

QSize RenderArea::minimumSizeHint() const
{
    return QSize(100,100);
}

QSize RenderArea::sizeHint() const
{
    return QSize(400,200);
}

void RenderArea::setShape(Shape shape)
{
    this->shape = shape;
    update();
}

void RenderArea::setPen(const QPen &pen)
{
    this->pen = pen;
    update();
}

void RenderArea::setBrush(const QBrush &brush)
{
    this->brush = brush;
    update();
}

void RenderArea::setAntialiased(bool antialiased)
{
    this->antialised = antialiased;
    update();
}

void RenderArea::setTransformed(bool transformed)
{
    this->transformed = transformed;
    update();
}

void RenderArea::paintEvent(QPaintEvent *event)
{
}

void RenderArea::mousePressEvent(QMouseEvent *event)
{

}

void RenderArea::mouseReleaseEvent(QMouseEvent *event)
{

}
