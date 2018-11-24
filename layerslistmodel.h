#ifndef LAYERSLISTMODEL_H
#define LAYERSLISTMODEL_H

#include <QAbstractListModel>
#include "layer.h"

class LayersListModel : public QAbstractListModel
{
    Q_OBJECT

public:
    explicit LayersListModel(const std::vector<Layer*>& layers, QObject *parent=nullptr);
    QVariant data(const QModelIndex &index, int role) const;
    int rowCount(const QModelIndex &parent = QModelIndex()) const;
    void addLayer(Layer* layer);
    void removeLayer(int layerIndex);

private:
    std::vector<Layer*> layers_;
};

#endif // LAYERSLISTMODEL_H
