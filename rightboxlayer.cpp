#include "rightboxlayer.h"
#include <QPainter>
#include <QDebug>
#include <QLineEdit>

RightBoxLayer::RightBoxLayer(QWidget* parent)
    :QStyledItemDelegate (parent)
{

}

//void RightBoxLayer::paint(QPainter* painter, const QStyleOptionViewItem& option, const QModelIndex& index) const {
//    QStyleOptionViewItemV4 opt = option;
//    qDebug() << "opt" << opt;

//    QRect rect = opt.rect;
//    painter->drawText(QRect(rect.left(), rect.top(), rect.width(), rect.height()/2),
//                              opt.displayAlignment, index.model()->data(index).toString());
//}
QWidget *RightBoxLayer::createEditor(QWidget *parent,
                                    const QStyleOptionViewItem &option,
                                     const QModelIndex &index) const {
    QLineEdit *editor = new QLineEdit(parent);
    return editor;
}

void RightBoxLayer::setEditorData(QWidget *editor,
                                 const QModelIndex &index) const
{
    QString value = index.model()->data(index, Qt::EditRole).toString();
    QLineEdit *lineEdit = static_cast<QLineEdit*>(editor);
    lineEdit->setText(value);
}


void RightBoxLayer::setModelData(QWidget *editor, QAbstractItemModel *model,
                                   const QModelIndex &index) const
{
    QLineEdit *lineEdit = static_cast<QLineEdit*>(editor);
    QString value = lineEdit->text();

    model->setData(index, value, Qt::EditRole);
}
