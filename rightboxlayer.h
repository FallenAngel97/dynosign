#ifndef RIGHTBOXLAYER_H
#define RIGHTBOXLAYER_H
#include <QStyledItemDelegate>

class RightBoxLayer : public QStyledItemDelegate
{
    Q_OBJECT
public:
    RightBoxLayer(QWidget* parent = nullptr);
    QWidget *createEditor(QWidget *parent, const QStyleOptionViewItem &option,
                              const QModelIndex &index) const override;
    void setEditorData(QWidget *editor,
                                     const QModelIndex &index) const override;
    void setModelData(QWidget *editor, QAbstractItemModel *model,
                                       const QModelIndex &index) const override;
//protected:
//    void paint(QPainter* painter, const QStyleOptionViewItem& option, const QModelIndex& index) const;
};

#endif // RIGHTBOXLAYER_H
